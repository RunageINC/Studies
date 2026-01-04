
#NestJS

For safety reasons, some entity values cannot be retrieved (for example a user's password) in a trivial way, through a GET endpoint. 

Interceptors acts before, after or both on resolution of a request. It can also conflict with Guards, so they must be used with awareness. They are responsible to work on the values on each flow of the request where they were implemented.

To solve this, there are 2 ways of intercepting responses: one from the official documentations and the other one that is simpler:

### Official way

The first step is to exclude the property from our entity with the @Exclude() decorator: 

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;
}
```

Then, after this we go to the controller and intercept the response with the ClassSerializeInterceptor and the @UseInterceptors() decorator:

```typescript
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
```

The problem with this approach is that if we want to reuse this entity and show it on a more detailed view for other admin routes, for example, it won't be possible because the @Exclude() decorator is not customizable.

The way to solve it is very similar to what is seen in Spring: by using DTO's for each route.

### Unofficial (but more flexible) way

For this to work, it is required that we build a custom interceptor. Interceptors can be applied to each route individually or to a whole controller, which will be applied globally.

The syntax for creting it is:

```typescript
class CustomInterceptor {
	intercept(context: ExecutionContext, next: CallHandler) {}
}
```

1. The `intercept` method is called automatically
2. Information on the incoming request is passed through ExecutionContext
3. Kind of a reference to the request handler in our controller

So for creating the interceptor:

```typescript
import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // run code before request is handled

    return next.handle().pipe(
      map((data: any) => {
        //run something before response is sent out

        return data;
      }),
    );
  }
}
```

Then we can use it on our controller:

```typescript
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(SerializeInterceptor)
  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
```

We then create a DTO for exposure, by using the opposite of @Exclude(), which will be @Expose()

```typescript
import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  email: string;
}
```

On the SerializeInterceptor, we then import the UserDto and use it on the pipe:

```typescript
export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(UserDto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
```

The key here is the `excludeExtraneousValues`. This property exposes only what we explicitly expose on the DTO with the @Expose() decorator.

To make it reusable, we can twerk the SerializeInterceptor a little bit so it can accept which type it is going to use for serializing the interceptor:

```typescript
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
```

And on our controller, we pass it as an argument for the constructor:

```typescript
@UseInterceptors(new SerializeInterceptor(UserDto))
@Get('/:id')
async findUserById(@Param('id') id: string) {}
```

Now, to enhance the solution, the better way to do it is to wrap it around a decorator so we reduce the code being used:

```typescript
import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
```

Then we can use the decorator:

```typescript
  @Serialize(UserDto)
  @Get('/:id')
```

Then instead of importing SerializeInterceptor we can just intercept Serialize.

For the serializer to run globally, we can use it above the controller instead of using it on an specific route:

```typescript
@Controller('auth')
@Serialize(UserDto)
export class UsersController {}
```

We can also use an interceptor on a global level, applying it on every single controller. For this to work, there are 2 approaches we can use: 

### Using interceptors globally
#### Wrap around Module

With this approach, it is necessary that we use the providers of the module. For this, we first import the interceptor we want on the Module file, and then we use it on providers to pass it through the controllers.

Look at the `CurrentUserInterceptor`:

```typescript
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth/auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptors';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, AuthService, CurrentUserInterceptor],
  controllers: [UsersController],
})
export class UsersModule {}
```

Then on the Controller, we can use the `UseInterceptors` on the top of our controller, passing our interceptor as a parameter:

```typescript
import {
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth/auth.service';
import { SignInUserDto } from './dtos/signin-user.dto';
import { CurrentUser } from './decorator/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptors';

@Controller('auth')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController { ... }
```

The downside of this approach is that if we have multiple controllers, this is going to be required for each one of them, causing a lot of imports.

![[Pasted image 20250321221824.png]]

The second way of using it is by using a more global approach, only requiring one instance of this same interceptor.

#### Second way: using the APP_INTERCEPTOR

This approach is a more Module-based approach. Instead of calling the interceptor on our controller, we're going to provide it directly on the module through a very special import:

```typescript
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth/auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptors';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
```

The big deal here is that we are using the `APP_INTERCEPTOR` as a better way to handle it properly. The downside of this approach is that under UsersModule, on this example, there might have some controllers that do not require the interceptor logic to be applied, so this must be taken into account.
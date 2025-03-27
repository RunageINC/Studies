
#NestJS 

The validation step, can refuse requests before actually sending them to controller. It must be used with bootsrap data:

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
```


When setting up automatic validations, there are a couple steps that follows:

1. Tell nest to use global validation
2. Creates a class that describes the different properties that the request body should have (the famous DTO)
3. Add validation rules to the class
4. Apply that class to the request handler

For it to properly work, there are 2 libs that are essential: `class-validator` and `class-transformer`.

When creating the DTO, we will pass which validations will be used:

```typescript
import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  content: string;
}
```

Then on controller, we can set the body properly with the same type as our DTO, just like spring:

```typescript
@Post()
  createMessage(@Body() body: CreateMessageDto) {
    return body;
  }
```

As we know, no type information is persisted on JS, so why does it work?

DTO has no functionalities, only carrying data from the request to controller. That's where `class-transformer` comes into play. The main goal of the lib is to turn JSON into JS Classes.

`class-validator` handles the validation of the properties by using the decorators. It is almost the same as the validation from Spring.

Due to our compiler options `emitDecoratorMetadata` , a little bit of the TypeScript logic goes into JavaScript world, which can be seen on dist after running the code.

> It can be of great usage to take a look at the files created by the builds and node modules.

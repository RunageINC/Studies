
#NestJS

There are 2 solutions that works really well with Nest. Others can work as well, but the main ones are:

- TypeORM
	- SQLite
	- Postgres
	- MySQL
	- MongoDB
- Mongoose
	- MongoDB


For having it to work there are 3 other dependencies that must be installed: `@nestjs/typeorm typeorm mysql2`.

The last one is only if you are using mysql. If you are using others, the documentation for [TypeORM](https://typeorm.io/) must be read.

`mysql2` is a fork of `mysql` client but mysql lib does not work properly with newer mysql versions.

For the TypeORM to work, it must be imported in a very specific way, using forRoot():

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'mycv',
      entities: [],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

The `synchronize` feature must be only used on development as it updates the database with our current entity properties, granting consistency. This allows us to not have the need of creating a migration.

### Entities

Very similar to a model (or Entity on a spring context), defines a single kind of resource or a thing that we want to store in the app. 

The entities array are the entities we're going to work with. The flow is very simple

1. Create the entity file and create a class in it that lists ll the properties.
2. Connect the entity to its parent module. This will generate a repository
3. Connect the entity to the root connection (in app module)

The skeleton for an entity goes very similar with Spring:

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
```

On the module side, we have to use a new method called forFeature() from TypeOrmModule:

```typescript
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
```

This method will generate the repository for us. Finally, the connection to the root app:

```typescript
// imports...
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'mycv_db',
      entities: [User],
      username: 'mycv',
      password: 'mycv',
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Repository

On TypeORM, the repository API is auto generated when creating the entity. They have a few methods already by default:

- **create()** -> makes a new instance of an entity but without persisting
- **save()** -> inserts or updates a record on DB. It does perform insert() or update() depending on the scenario. It uses an entity instance for executing, allowing for hooks to be executed
- **find()** -> runs a query that returns a list of entities
- **remove()** -> remove a record from the DB using an entity instance, allowing for hooks to be executed
- **delete()** -> removes a record from the db without executing hooks

The repositories generated can be injected through another decorator called @InjectRepository, which carries the entity as an argument:

```typescript
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
}
```

> It is a good practice to first create() a new user before saving as the hooks(@After[Something], more on that below) will be executed due to creating an entity instance. 

#### Other valid decorators

##### @AfterInsert, @AfterUpdate, @AfterRemove

Those decorators perform operations on different steps of the entity. Always executed when we are dealing with instances of the entity.

#### Entity relationship decorators

##### One-to-Many and Many-to-One

The decorator for [[One-to-Many ↔ Many-to-One]] relationship requires from the **One** side to have what is the entity that is going to return and how:

```typescript
@OneToMany(() => Report, (report) => report.user)
reports: Report[];
```

Then on the **Many** side, we map with another decorator:

```typescript
@ManyToOne(() => User, (user) => user.reports)
user: User;
```

It is important to note that the association is not automatically fetched when we fetch one of the entities. For this to happen, we have to add additional options to the query when we fetch the entities associated:

## [[Query Builder]]



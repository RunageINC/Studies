
#NestJS 

For NestJS configurations, there's a lib that we can use for this to work: _@nestjs/config_.

This lib includes another lib called `dotenv` ([[Library - dotenv]]).  This is a lib that is commonly used across many different projects on JavaScript ecosystem. Its goal is to put together a list of different environment variables that exists on the machine, and help with compatibility across multiple OS.

If there's a conflict between names on the env files, what is on the machine is going to take precedence: 

1. _.env file_ -> DB_NAME = 'db.sqlite'
2. _Normal env var_ -> DB_NAME = asdf

The result would be `asdf`

The object created through this lib will be injected through DI. This lib also helps with different environment files for different flows (e.g.: prod, beta, staging, dev).

After setting the files with the environment you would like (e.g.: `.env.development`, `.env.test`, etc), it is necessary to, under `app.module.ts` (the root module), configure and add some classes from the _@nestjs/config_, through `ConfigModule`, `ConfigService` and `TypeOrmModule.forRootAsync` method:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          database: config.get<string>('DB_NAME'),
          host: config.get<string>('DB_HOST'),
          port: parseInt(config.get<string>('DB_PORT') || '3306', 10),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          entities: [User, Report],
        };
      },
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

The lib `cross-env` can help through mutiple OS as well. Instead of setting the environment only on the command line, the lib can help setting everything up.

Under `package.json`:

`"start:dev": "cross-env NODE_ENV=development nest start --watch",`


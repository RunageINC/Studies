
#NestJS 

Migrations are a way of updating the structure of a database. Those updates are based on files that has two functions defined inside of it, usually called up and down.

The `up()` function describes how to update the DB being it a create, update, delete while the `down()` describes how to perform a rollback.

Migrations are created and ran through TypeORM CLI. It has nothing to do with Nest and does not know about modules, configurations, nor anything related.

The CLI itself generates an empty migration file. All SQL code must be added on this empty file.

There are a few configurations for TypeORM to connect on the database and run migrations:

- Environment variables
	- Can be a problem depending on the host, as the host can provide a database with environment variables immediately set up.
- Environment variables in a .env file
	- Can be a problem depending on the host, as the host can provide a database with environment variables immediately set up.
- ormconfig.json
	- Fixed configuration file
	- Need to have scripting abilities for it to work on multiple environments
- ormconfig.js
	- It won't go through babel nor anything like that
	- Must use common js export type (`module.exports`)
	- The most common downside is that for E2E testing, it can generate bugs due to being a .js file and Nest is compiling with TS first, due to jest using TypeScript directly. 
- ormconfig.ts
	- Can be a problem when running the application because the dev environment goes past beyond the TypeScript and the project in Nest may not recognize this file.
- ormconfig.yml
	- Fixed configuration file
	- Need to have scripting abilities for it to work on multiple environments
- ormconfig.xml (not very used)
	- Fixed configuration file
	- Need to have scripting abilities for it to work on multiple environments



The easiest approach is to use the `.js` file, and the configuration is really easy to setup:

```javascript
const dbConfig = {
  synchronize: false,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'mysql',
      database: 'mycv_db',
      host: 'localhost',
      port: '3306',
      username: 'mycv',
      password: 'mycv',
      entities: ['**/*.entity.ts'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
    });
    break;
  case 'production':
    break;
  default:
    break;
}

module.exports = { dbConfig };
```

### Running migrations

To run those migrations, it is needed to first install a module called `ts-node`:

````
npm install ts-node --save-dev
```` 

Then, we configure a script for it to run properly and create the migrations: 

```json
"scripts":{
	...
	"typeorm": "typeorm-ts-node-commonjs"
}
```

#### Creating a new migration

To create a new migration, it is pretty simple. As we defined that the path to migration is `migrations/...`, it will run under this path. The command below will generate an empty migration:

`npm run typeorm migration:create migrations/<migration-name>`

For running with existing entities, the command is slightly different:


#### Running migrations 

Then it is easier to run by calling the command: 

`npm run typeorm migration:run -- -d path-to-ds-config`


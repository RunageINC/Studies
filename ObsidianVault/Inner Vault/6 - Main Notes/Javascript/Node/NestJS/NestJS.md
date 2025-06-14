
#NestJS

Currently, most of the NestJS apps have the following dependency structure:

```json
"@nestjs/common": "^11.0.11",
"@nestjs/core": "^11.0.11",
"@nestjs/platform-express": "^11.0.11",
"reflect-metadata": "^0.2.2",
"typescript": "^5.8.2"
```

Each dependency is responsible for something different:

- *@nestjs/common* -> Vast majority of functions, classes, etc from Nest
- *@nestjs/platform-express* -> Uses express for handling requests
- *reflect-metadata* -> Uses decorators
- *typescript* -> Obvious reasons

Additional dependencies can be installed for configuring (which will be explained after):

- _@nestjs/config_ -> for setting up automatic configuration

NestJS does not handle requests. It relies on an outside implementation to handle those requests. There are 2 options:

- [[Express]] (default)
- [[Fastify]]

On [[TypeScript]] configuration, there are 2 important settings on configuration that are really important:

```json
"experimentalDecorators": true,
"emitDecoratorMetadata": true
```

Those configurations only needs to be done when you create the app from scratch. There's a CLI for NestJS that can be used for speeding up the process and automate a lot of things. To use it, you need to install through npm:

`npm i -g @nestjs/cli`

After this, the command can be run anywhere:

`nest new <project>`

The CLI can also help when generating new files for our project.

Nest follows the request-response cycle, as any REST application does. It basically follows the same pattern of:



![[Pasted image 20250316121439.png]]

In some cases, authentication is not required. But this is a general step.

Basically, the steps are:

- **Pipe** -> Helps validates requests
- **Guard** -> Helps with authentication. Guards a route and forbids access.
- **Controller** -> Handles requests
- **Service** -> Handles data access and business logic
- **Repository** -> Handles data from db

## 1. [[Pipe]]

## 2. [[6 - Main Notes/Javascript/Node/NestJS/Controller|Controller]]

## 3. [[Module]]

## 4. [[Services]]

## 5. [[Repositories]]

## 6. [[Nest Factory]]

## 7. [[Naming Conventions]]

## 8. [[Dependency Injection (DI)]]

## 9. [[TypeORM and Mongoose]]

## 10. [[Interceptors]]

## 11. [[Authentication]]

## 12. [[Guard]]

## 13. [[Custom Decorators]]

## 14. [[6 - Main Notes/Javascript/Node/NestJS/Configurations]]

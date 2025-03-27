
#NestJS

It is pretty clear that each layer is on an hierarchy: 

_Controller -> Service -> Repository_

Without the repository, the service would't properly work, and this goes on. Nest, as well as Spring, handles this with IoC (Inversion of Control) principle:

> Classes should not create instances of its dependencies on its own.

This principle enforces that we should not create dependencies on the code itself, by creating instances for example:
### Inversion of Control: Why is this important?

<span style="color: red">Bad solution:</span>
```typescript
// Example of a bad code

export class MessagesService {
  messagesRepository: MessagesRepository;

  constructor() {
    this.messagesRepository = new MessagesRepository();
  }
}
```

There are a few ways to solve this problem, while following IoC:

1. <span style="color: yellow">Good solution:</span> MessageService receives the dependency: 
```typescript
export class MessagesService {
  messagesRepository: MessagesRepository;

  constructor(messagesRepository: MessagesRepository) {
    this.messagesRepository = messagesRepository;
  }
}
```

The example above is heavily used by Spring, for example, as it can be used to help mocking repositories on unit testing. This is a huge thing, as we are properly defining that the service level should receive what to inject as a message repository.

The only problem with this solution is that we ended up relying too much on a specific implementation of the repository, and it being passed down to the constructor

2. <span style="color: #2fed1a">Best solution:</span> MessageService receives the dependency and does not specify it as a MessageRepository: 
```typescript
interface Repository {
	findOne(id: string);
	findAll();
	create(content: string);
}

export class MessagesService {
  messagesRepository: Repository;

  constructor(messagesRepository: Repository) {
    this.messagesRepository = messagesRepository;
  }
}
```


Instead of waiting for a specific copy of messages repository, we have a defined interface `Repository`, and we must provide a concrete implementation of such. We do not require exactly this repository, but anyone. This helps even more on testing, because now we do not need to know the EXACT implementation but instead we can rely on fake repos for unit testing. So basically instead of having to write `mockRepo: MessageRepo` we can do `mockRepo: Repo` and mock its functions way quicker. And by the way it can be used by any automated testing environment.

Even more than this, we can also rapidly replace implementations of those same repositories if we find something that is faster/better.

### Nest DI Container/Injector

Runs basically similar to Spring application context, with the language differences. It is a way to create lots of instances and inject them through the decorators so the IoC is done way better than doing it manually. The flow is basically:

1. At startup, register all classes with the container
2. Container will figure out what each dependency each class has
3. We then ask the container to create an instance of a class for us
4. Container creates all required dependencies and gives us the instance
5. Container will hold onto the created dependency instances and reuse them if needed (just like Application Context)

Steps 1 and 2 will make use of the @Injectable decorator.

```typescript
import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
	constructor(public readonly messagesRepository: MessagesRepository) {}
}

// ---------------------------
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesRepository {}

// ---------------------------
import { MessagesService } from './messages.service';

export class MessagesController {
	constructor(public readonly messagesService: MessagesService) {}
}
```

Then, on our module, we have to provide them:

```typescript
import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository],
})
export class MessagesModule {}
```

#### Notes on DI

As said above, there's the good and the best solution. Unfortunately, due to how JS and TS works, using the Interface system is way harder than it seems, so Nest ends up assuming that you are using the good solution.

Sometimes making use of DI can be a bit of extra work, so think of it not as a silver bullet but as a facilitator.

## Sharing code between modules with DI

There's a way to inject dependencies outside of the current module. By default all the services wrapped on a module and listed on the providers array are private. In other words, the module's service cannot be accessed by other module. To change that, there's a keyword for the @Module decorator that exports the service:

```typescript
import { Module } from '@nestjs/common';
import { PowerService } from './power.service';
import { PowerController } from './power.controller';

@Module({
  providers: [PowerService],
  controllers: [PowerController],
  exports: [PowerService],
})
export class PowerModule {}
```

Then on the other module, we are going to import the entire module to where we want:

```typescript
import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { CpuController } from './cpu.controller';
import { PowerModule } from 'src/power/power.module';

@Module({
  providers: [CpuService],
  controllers: [CpuController],
  imports: [PowerModule],
})
export class CpuModule {}
```

Then, we can properly use the service from one module to another one:

```typescript
import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
  constructor(private readonly powerService: PowerService) {}
}
```

The most important keywords here are:

- **export** from where we are exporting the services. It exports the services itself.
- **import** from where we are importing the modules. Must consume a module.
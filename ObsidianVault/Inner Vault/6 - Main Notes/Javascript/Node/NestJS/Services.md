
#NestJS

Services are classes that carries business logic. They use repositories to work with persistence.

Can be generated the same way as the others: `nest generate service <name>`

```typescript
import { MessagesRepository } from './messages.repository';

import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  constructor(public readonly messagesRepository: MessagesRepository) {}

  async findOne(id: string) {
    return this.messagesRepository.findOne(id);
  }

  async findAll() {
    return this.messagesRepository.findAll();
  }

  async createMessage(content: string) {
    return this.messagesRepository.create(content);
  }
}

```

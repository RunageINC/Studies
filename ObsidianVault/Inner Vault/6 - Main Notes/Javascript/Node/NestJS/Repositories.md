
#NestJS

Classes used to work with storage-related logic. Ends up usually being a TypeORM entity, Mongoose schema or something like this, so those classes ends up being a wrapper. The only one that cannot be generated through CLI

```typescript
import { readFile, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesRepository {
  #url = __dirname + '/data/messages.json';

  async #readContent() {
    const contents = await readFile(this.#url, 'utf-8');

    return JSON.parse(contents);
  }

  async findOne(id: string) {
    const messages = await this.#readContent();

    if (!messages[id]) {
      throw new Error('Message not found');
    }

    return messages[id];
  }

  async findAll() {
    return await this.#readContent();
  }

  async create(content: string) {
    const messages = await this.#readContent();

    const id = Math.floor(Math.random() * 999);

    messages[id] = { id, content };

    await writeFile(this.#url, JSON.stringify(messages));
  }
}
```


> OBS: generate command can be abbreviated as g
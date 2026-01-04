/* eslint-disable @typescript-eslint/no-unsafe-return */
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

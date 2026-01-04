import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserBody: CreateOrReadUserBody) {
    const userInstance = this.usersRepository.create(createUserBody);

    return await this.usersRepository.save(userInstance);
  }

  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException('No ID was given');
    }

    return this.usersRepository.findOneBy({ id });
  }

  async find(email: string) {
    return this.usersRepository.find({ where: { email } });
  }

  async update(id: number, attributes: Partial<User>) {
    // without hooks, if not needed
    // return this.usersRepository.update({ id }, attributes);

    // runs with hooks
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    // Object.assign copies attributes from one obj to another
    Object.assign(user, attributes);

    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    // this.usersRepository.delete(id) // no hooks
    const user = await this.findOne(id);

    if (!user) return;

    await this.usersRepository.remove(user);
  }
}

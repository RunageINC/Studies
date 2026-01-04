import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(createUserBody: CreateOrReadUserBody) {
    const { email, password } = createUserBody;

    const users = await this.usersService.find(email);

    if (users.length) {
      throw new BadRequestException('Email already in use');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = `${salt}.${hash.toString('hex')}`;

    const createdUser = {
      ...createUserBody,
      password: result,
    };

    return await this.usersService.create(createdUser);
  }

  async signin(readUserBody: CreateOrReadUserBody) {
    const { email, password } = readUserBody;

    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('User was not found for given email');
    }

    const [salt, storedHash] = user.password.split('.');

    const loggedUserPasswordHash = (await scrypt(password, salt, 32)) as Buffer;
    const stringHashedPwd = loggedUserPasswordHash.toString('hex');

    if (storedHash === stringHashedPwd) {
      return user;
    }

    throw new BadRequestException('Wrong username or password');
  }
}

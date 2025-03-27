import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth/auth.service';
import { SignInUserDto } from './dtos/signin-user.dto';
import { CurrentUser } from './decorator/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signup')
  async createUser(
    @Body() createUserBody: CreateUserDto,
    @Session() session: MyCVSession,
  ) {
    const user = await this.authService.signup(createUserBody);

    session.userId = user.id;

    return user;
  }

  @Post('/signin')
  async signIn(
    @Body() readUserBody: SignInUserDto,
    @Session() session: MyCVSession,
  ) {
    const user = await this.authService.signin(readUserBody);

    session.userId = user.id;

    return user;
  }

  @Post('/signout')
  signOut(@Session() session: MyCVSession) {
    session.userId = null;
  }

  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() updateUserBody: UpdateUserDto) {
    return this.usersService.update(parseInt(id), updateUserBody);
  }
}

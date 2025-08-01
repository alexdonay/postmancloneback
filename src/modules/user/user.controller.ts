import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUsecase } from './usecases/create/create-user.usecase';
import { CreateUserDto } from './usecases/create/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly createUserUsecase: CreateUserUsecase) {}

  @Post('create')
  async createUser(@Body() input: CreateUserDto): Promise<string> {
    await this.createUserUsecase.execute(input);
    return 'User created successfully';
  }
}

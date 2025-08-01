import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../user.repository';
import { User } from '../../user.entity';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: CreateUserDto): Promise<User> {
    const passwordCrypted = await bcrypt.hash(data.password, 10);
    data.password = passwordCrypted;
    return this.userRepository.create(data);
  }
}

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserUsecase } from './usecases/create/create-user.usecase';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User]), Repository],
  providers: [UserRepository, Repository, CreateUserUsecase],
})
export class UserModule {}

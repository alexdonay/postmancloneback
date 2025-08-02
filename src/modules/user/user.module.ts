import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserUsecase } from './usecases/create/create-user.usecase';

@Module({
  controllers: [UserController],
  // 1. REMOVER 'Repository' daqui. TypeOrmModule.forFeature já cuida disso.
  imports: [TypeOrmModule.forFeature([User])],
  // 2. REMOVER 'Repository' daqui. Não é um provider que você registra manualmente.
  providers: [UserRepository, CreateUserUsecase],
  // 3. EXPORTAR o repositório para que outros módulos (como o AuthModule) possam usá-lo.
  exports: [UserRepository],
})
export class UserModule {}
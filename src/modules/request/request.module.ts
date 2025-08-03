import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './request.entity';
import { RequestController } from './request.controller';
import { CreateRequestUsecase } from './usecases/create/create-request.usecase';

import { UpdateRequestUsecase } from './usecases/update/update-request.usecase';
import { DeleteRequestUsecase } from './usecases/delete/delete-request.usecase';
import { RequestRepository } from './request.repository';

// 1. IMPORTE O MÓDULO DO GRUPO DE REQUISIÇÕES
import { RequestGroupModule } from '../request-group/request-group.module';
import { FindRequestByIdUsecase } from './usecases/find-many/find-request-by-id.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([Request]),
    RequestGroupModule, // 2. ADICIONE O MÓDULO AQUI
  ],
  controllers: [RequestController],
  providers: [
    RequestRepository,
    CreateRequestUsecase,
    FindRequestByIdUsecase,
    UpdateRequestUsecase,
    DeleteRequestUsecase,
  ],
  exports: [RequestRepository],
})
export class RequestModule {}
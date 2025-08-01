import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RequestGroupRepository } from './request-group.repository';
import { CreateRequestGroupUsecase } from './usecases/create-request-group/create-request-group.usecase';
import { DeleteRequestGroupUsecase } from './usecases/delete-request-group/delete-request-group.usecase';
import { RequestGroup } from './requestGroup.entity';
import { WorkspaceModule } from '../workspace/workspace.module';
import { RequestGroupController } from './request-group.controller';
import { FindAllRequestGroupsByWorkspaceUsecase } from './usecases/find-all-request-groups-by-workspace/find-all-request-groups-by-workspace.usecase';
import { FindRequestGroupByIdUsecase } from './usecases/find-request-group-by-id/find-request-group-by-id.usecase';
import { UpdateRequestGroupUsecase } from './usecases/update-request-group/update-request-group.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([RequestGroup]), WorkspaceModule],
  providers: [
    RequestGroupRepository,
    CreateRequestGroupUsecase,
    DeleteRequestGroupUsecase,
    FindAllRequestGroupsByWorkspaceUsecase,
    FindRequestGroupByIdUsecase,
    UpdateRequestGroupUsecase,
  ],
  controllers: [RequestGroupController],
  exports: [
    RequestGroupRepository,
    CreateRequestGroupUsecase,
    DeleteRequestGroupUsecase,
    FindAllRequestGroupsByWorkspaceUsecase,
    FindRequestGroupByIdUsecase,
  ],
})
export class RequestGroupModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from './workspace.entity';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceRepository } from './workspace.repository';
import { WorkspaceOwnerGuard } from '../common/workspace-owner.guard';
import { CreateWorkspaceUsecase } from './usecases/create/create-workspace.usecase';
import { FindAllWorkspacesUsecase } from './usecases/find-all/find-all-workspaces.usecase';
import { UpdateWorkspaceUsecase } from './usecases/update/update-workspace.usecase';
import { FindWorkspaceByIdUsecase } from './usecases/find-workspace-by-id/find-workspace-by-id.usecase';
import { DeleteWorkspaceUsecase } from './usecases/delete/delete-workspace.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace])],
  controllers: [WorkspaceController],
  providers: [
    WorkspaceRepository,
    CreateWorkspaceUsecase,
    FindAllWorkspacesUsecase,
    FindWorkspaceByIdUsecase,
    UpdateWorkspaceUsecase,
    DeleteWorkspaceUsecase,
    WorkspaceOwnerGuard,
  ],
  exports: [WorkspaceRepository, WorkspaceOwnerGuard],
})
export class WorkspaceModule {}

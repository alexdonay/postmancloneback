import { Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './create-workspace.dto';
import { Workspace } from '../../workspace.entity';
import { WorkspaceRepository } from '../../workspace.repository';
import { User } from 'src/modules/user/user.entity';

@Injectable()
export class CreateWorkspaceUsecase {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}
  async execute(
    createWorkspaceDto: CreateWorkspaceDto,
    user: User,
  ): Promise<Workspace> {
    return this.workspaceRepository.create(createWorkspaceDto, user);
  }
}

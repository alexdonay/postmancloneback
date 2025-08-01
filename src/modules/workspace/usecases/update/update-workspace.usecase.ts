import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from '../../workspace.repository';
import { UpdateWorkspaceDto } from './update-workspace.dto';
import { Workspace } from '../../workspace.entity';

@Injectable()
export class UpdateWorkspaceUsecase {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async execute(
    id: string,
    updateWorkspaceDto: UpdateWorkspaceDto,
  ): Promise<Workspace> {
    // The ownership is checked by a Guard at the controller level.
    return this.workspaceRepository.update(id, updateWorkspaceDto);
  }
}

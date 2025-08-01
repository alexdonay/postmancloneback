import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkspaceRepository } from '../../workspace.repository';
import { Workspace } from '../../workspace.entity';

@Injectable()
export class FindWorkspaceByIdUsecase {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async execute(id: string): Promise<Workspace> {
    const workspace = await this.workspaceRepository.findById(id);
    if (!workspace) {
      throw new NotFoundException(`Workspace with ID "${id}" not found`);
    }
    return workspace;
  }
}

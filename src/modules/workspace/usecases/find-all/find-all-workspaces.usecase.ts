import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from '../../workspace.repository';
import { Workspace } from '../../workspace.entity';

@Injectable()
export class FindAllWorkspacesUsecase {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async execute(
    userId: string,
    page: number,
    limit: number,
  ): Promise<{
    data: Workspace[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    return this.workspaceRepository.findAll(Number(userId), page, limit);
  }
}

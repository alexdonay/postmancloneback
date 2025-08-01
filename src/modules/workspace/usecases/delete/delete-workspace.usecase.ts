import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from '../../workspace.repository';

@Injectable()
export class DeleteWorkspaceUsecase {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async execute(workspaceId: string, userId: string): Promise<void> {
    const isOwner = await this.workspaceRepository.isOwner(workspaceId, userId);
    if (!isOwner) {
      throw new Error('You do not have permission to delete this workspace.');
    }
    await this.workspaceRepository.delete(workspaceId);
  }
}

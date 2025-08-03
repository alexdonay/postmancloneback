import { Injectable, NotFoundException } from "@nestjs/common";
import { WorkspaceRepository } from "../workspace.repository";
import { Workspace } from "../workspace.entity";

@Injectable()
export class findManyWorkspacesByUserIdUsecase {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async execute(userId: string): Promise<Workspace[]> {
    const workspaces = await this.workspaceRepository.findManyByUserId(userId);
    if (!workspaces || workspaces.length === 0) {
      throw new NotFoundException(`No workspaces found for user ID "${userId}"`);
    }
    return workspaces;
  }
}
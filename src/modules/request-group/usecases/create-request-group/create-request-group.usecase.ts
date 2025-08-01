import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestGroupRepository } from '../../request-group.repository';
import { CreateRequestGroupDto } from './create-request-group.dto';
import { RequestGroup } from '../../requestGroup.entity';
import { WorkspaceRepository } from '../../../workspace/workspace.repository';

@Injectable()
export class CreateRequestGroupUsecase {
  constructor(
    private readonly requestGroupRepository: RequestGroupRepository,
    private readonly workspaceRepository: WorkspaceRepository,
  ) {}

  async execute(
    workspaceId: string,
    createRequestGroupDto: CreateRequestGroupDto,
  ): Promise<RequestGroup> {
    const workspace = await this.workspaceRepository.findById(workspaceId);

    if (!workspace) {
      throw new NotFoundException(
        `Workspace with ID "${workspaceId}" not found`,
      );
    }

    return this.requestGroupRepository.create(createRequestGroupDto, workspace);
  }
}

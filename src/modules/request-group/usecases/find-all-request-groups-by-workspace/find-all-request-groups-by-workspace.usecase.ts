import { Injectable } from '@nestjs/common';
import { RequestGroupRepository } from '../../request-group.repository';
import { RequestGroup } from '../../requestGroup.entity';

@Injectable()
export class FindAllRequestGroupsByWorkspaceUsecase {
  constructor(
    private readonly requestGroupRepository: RequestGroupRepository,
  ) {}

  async execute(workspaceId: string): Promise<RequestGroup[]> {
    return this.requestGroupRepository.findAllByWorkspaceId(workspaceId);
  }
}

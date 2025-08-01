import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestGroupRepository } from '../../request-group.repository';
import { RequestGroup } from '../../requestGroup.entity';

@Injectable()
export class FindRequestGroupByIdUsecase {
  constructor(
    private readonly requestGroupRepository: RequestGroupRepository,
  ) {}

  async execute(id: string): Promise<RequestGroup> {
    const requestGroup = await this.requestGroupRepository.findById(id);
    if (!requestGroup) {
      throw new NotFoundException(`RequestGroup with ID "${id}" not found`);
    }
    return requestGroup;
  }
}

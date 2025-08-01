import { Injectable } from '@nestjs/common';
import { RequestGroupRepository } from '../../request-group.repository';
import { UpdateRequestGroupDto } from './update-request-group.dto';
import { RequestGroup } from '../../requestGroup.entity';

@Injectable()
export class UpdateRequestGroupUsecase {
  constructor(
    private readonly requestGroupRepository: RequestGroupRepository,
  ) {}

  async execute(
    id: string,
    updateRequestGroupDto: UpdateRequestGroupDto,
  ): Promise<RequestGroup> {
    return this.requestGroupRepository.update(id, updateRequestGroupDto);
  }
}

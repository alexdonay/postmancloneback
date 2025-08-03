import { Injectable, NotFoundException } from '@nestjs/common';

import { Request } from '../../request.entity';
import { RequestRepository } from '../../request.repository';
import { CreateRequestDto } from './create-request.dto';
import { RequestGroupRepository } from 'src/modules/request-group/request-group.repository';

@Injectable()
export class CreateRequestUsecase {
  constructor(
    private readonly requestRepository: RequestRepository,
    private readonly requestGroupRepository: RequestGroupRepository,
  ) {}

  async execute(
    requestGroupId: string,
    createRequestDto: CreateRequestDto,
  ): Promise<Request> {
    const requestGroup = await this.requestGroupRepository.findById(requestGroupId);
    if (!requestGroup) {
      throw new NotFoundException(`RequestGroup with ID "${requestGroupId}" not found`);
    }
    return this.requestRepository.create(createRequestDto, requestGroup);
  }
}
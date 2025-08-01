import { Injectable } from '@nestjs/common';
import { RequestGroupRepository } from '../../request-group.repository';

@Injectable()
export class DeleteRequestGroupUsecase {
  constructor(
    private readonly requestGroupRepository: RequestGroupRepository,
  ) {}

  async execute(id: string): Promise<void> {
    return this.requestGroupRepository.delete(id);
  }
}

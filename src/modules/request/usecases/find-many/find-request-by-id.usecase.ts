import { Injectable } from '@nestjs/common';
import { Request } from '../../request.entity';
import { RequestRepository } from '../../request.repository';

@Injectable()
export class FindRequestByIdUsecase {
  constructor(private readonly requestRepository: RequestRepository) {}
  async execute(id: string): Promise<Request> {
    return this.requestRepository.findById(id);
  }
}
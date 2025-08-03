import { Injectable } from '@nestjs/common';
import { RequestRepository } from '../../request.repository';

@Injectable()
export class DeleteRequestUsecase {
  constructor(private readonly requestRepository: RequestRepository) {}
  async execute(id: string): Promise<void> {
    return this.requestRepository.delete(id);
  }
}
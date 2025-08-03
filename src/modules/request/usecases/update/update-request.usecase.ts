import { Injectable } from '@nestjs/common';
import { Request } from '../../request.entity';
import { RequestRepository } from '../../request.repository';
import { UpdateRequestDto } from './update-request.dto';

@Injectable()
export class UpdateRequestUsecase {
  constructor(private readonly requestRepository: RequestRepository) {}
  async execute(id: string, dto: UpdateRequestDto): Promise<Request> {
    return this.requestRepository.update(id, dto);
  }
}
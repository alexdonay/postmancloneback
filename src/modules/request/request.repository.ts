import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestGroup } from '../request-group/requestGroup.entity';
import { Request } from './request.entity';
import { CreateRequestDto } from './usecases/create/create-request.dto';
import { UpdateRequestDto } from './usecases/update/update-request.dto';

@Injectable()
export class RequestRepository {
  constructor(
    @InjectRepository(Request)
    private readonly repository: Repository<Request>,
  ) {}

  async create(
    createRequestDto: CreateRequestDto,
    requestGroup: RequestGroup,
  ): Promise<Request> {
    const request = this.repository.create({
      ...createRequestDto,
      requestGroup,
    });
    return this.repository.save(request);
  }

  async findById(id: string): Promise<Request> {
    const request = await this.repository.findOne({ where: { id } });
    if (!request) {
      throw new NotFoundException(`Request with ID "${id}" not found`);
    }
    return request;
  }

  async update(id: string, updateRequestDto: UpdateRequestDto): Promise<Request> {
    // Carrega a request existente para garantir que ela exista antes de atualizar
    const request = await this.findById(id);
    this.repository.merge(request, updateRequestDto);
    return this.repository.save(request);
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Request with ID "${id}" not found`);
    }
  }

  async isOwner(requestId: string, userId: string): Promise<boolean> {
    const count = await this.repository
      .createQueryBuilder('request')
      .innerJoin('request.requestGroup', 'requestGroup')
      .innerJoin('requestGroup.workspace', 'workspace')
      .where('request.id = :requestId', { requestId })
      .andWhere('workspace.user_id = :userId', { userId })
      .getCount();

    return count > 0;
  }
}
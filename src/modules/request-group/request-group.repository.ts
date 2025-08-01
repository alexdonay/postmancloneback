import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestGroup } from './requestGroup.entity';

import { Workspace } from '../workspace/workspace.entity';
import { CreateRequestGroupDto } from './usecases/create-request-group/create-request-group.dto';
import { UpdateRequestGroupDto } from './usecases/update-request-group/update-request-group.dto';

@Injectable()
export class RequestGroupRepository {
  constructor(
    @InjectRepository(RequestGroup)
    private readonly repository: Repository<RequestGroup>,
  ) {}

  async create(
    data: CreateRequestGroupDto,
    workspace: Workspace,
  ): Promise<RequestGroup> {
    const requestGroup = this.repository.create({
      name: data.name,
      workspace,
    });
    return this.repository.save(requestGroup);
  }

  async findAllByWorkspaceId(workspaceId: string): Promise<RequestGroup[]> {
    return this.repository.find({
      where: { workspace: { id: workspaceId } },
      relations: ['requests'],
      order: { created_at: 'ASC' },
    });
  }

  async findById(id: string): Promise<RequestGroup | null> {
    return this.repository.findOne({ where: { id }, relations: ['requests'] });
  }

  async update(
    id: string,
    updateRequestGroupDto: UpdateRequestGroupDto,
  ): Promise<RequestGroup> {
    await this.repository.update(id, updateRequestGroupDto);
    const updatedGroup = await this.findById(id);
    if (!updatedGroup) {
      throw new NotFoundException(`RequestGroup with ID "${id}" not found`);
    }
    return updatedGroup;
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`RequestGroup with ID "${id}" not found`);
    }
  }

  async isOwner(requestGroupId: string, userId: string): Promise<boolean> {
    const count = await this.repository
      .createQueryBuilder('request_group')
      .innerJoin('request_group.workspace', 'workspace')
      .innerJoin('workspace.user', 'user')
      .where('request_group.id = :requestGroupId', { requestGroupId })
      .andWhere('user.id = :userId', { userId })
      .getCount();
    return count > 0;
  }
}

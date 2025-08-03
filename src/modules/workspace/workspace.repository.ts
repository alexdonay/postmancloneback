import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from './workspace.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkspaceDto } from './usecases/create/create-workspace.dto';
import { User } from '../user/user.entity';

@Injectable()
export class WorkspaceRepository {
  constructor(
    @InjectRepository(Workspace)
    private readonly repository: Repository<Workspace>,
  ) {}

  async create(
    createWorkspaceDto: CreateWorkspaceDto,
    user: User,
  ): Promise<Workspace> {
    const workspace = this.repository.create({ ...createWorkspaceDto, user });
    return this.repository.save(workspace);
  }

  async findAll(
    userId: number,
    page = 1,
    limit = 10,
  ): Promise<{
    data: Workspace[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const [data, total] = await this.repository.findAndCount({
      where: { user: { id: userId } },
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: 'DESC' },
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<Workspace | null> {
    return this.repository.findOne({ where: { id }, relations: ['user'] });
  }

  async update(id: string, workspace: Partial<Workspace>): Promise<Workspace> {
    await this.repository.update(id, workspace);
    const updatedWorkspace = await this.findById(id);
    if (!updatedWorkspace) {
      throw new NotFoundException(`Workspace with ID "${id}" not found`);
    }
    return updatedWorkspace;
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Workspace with ID "${id}" not found`);
    }
  }

  async isOwner(workspaceId: string, userId: string): Promise<boolean> {
    const count = await this.repository
      .createQueryBuilder('workspace')
      .where('workspace.id = :workspaceId', { workspaceId })
      .andWhere('workspace.user_id = :userId', { userId })
      .getCount();
    return count > 0;
  }
  async findManyByUserId(userId: string): Promise<Workspace[]> {
    return this.repository.find({
      where: { user: { id: Number(userId) } },
      order: { created_at: 'DESC' },
    });
  }
}


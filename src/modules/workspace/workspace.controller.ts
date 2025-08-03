import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WorkspaceRepository } from './workspace.repository';
import { CreateWorkspaceUsecase } from './usecases/create/create-workspace.usecase';
import { CreateWorkspaceDto } from './usecases/create/create-workspace.dto';
import { Workspace } from './workspace.entity';
import { AuthGuard } from '@nestjs/passport';

import { User } from '../user/user.entity';
import { GetUser } from '../common/get-user.decorator';

@Controller('workspaces')
@UseGuards(AuthGuard('jwt'))
export class WorkspaceController {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly createWorkspaceUsecase: CreateWorkspaceUsecase,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
    @GetUser() user: User,
  ): Promise<Workspace> {
    return this.createWorkspaceUsecase.execute(createWorkspaceDto, user);
  }

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<{
    data: Workspace[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    return this.workspaceRepository.findAll(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Workspace | null> {
    return this.workspaceRepository.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() workspace: Workspace,
  ): Promise<Workspace | null> {
    return this.workspaceRepository.update(id, workspace);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.workspaceRepository.delete(id);
  }

  @Get('user/:userId')
  async findByUserId(
    @Param('userId') userId: string)
    : Promise<Workspace[]> {
      return this.workspaceRepository.findManyByUserId(userId)
    }
}

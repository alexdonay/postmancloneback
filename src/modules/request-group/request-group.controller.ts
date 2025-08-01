import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RequestGroupOwnerGuard } from '../common/request-group-owner.guard';
import { WorkspaceOwnerGuard } from '../common/workspace-owner.guard';
import { JwtAuthGuard } from '../infra/auth/jwt-auth.guard';
import { RequestGroup } from './requestGroup.entity';
import { CreateRequestGroupUsecase } from './usecases/create-request-group/create-request-group.usecase';
import { CreateRequestGroupDto } from './usecases/create-request-group/create-request-group.dto';
import { DeleteRequestGroupUsecase } from './usecases/delete-request-group/delete-request-group.usecase';
import { FindAllRequestGroupsByWorkspaceUsecase } from './usecases/find-all-request-groups-by-workspace/find-all-request-groups-by-workspace.usecase';
import { FindRequestGroupByIdUsecase } from './usecases/find-request-group-by-id/find-request-group-by-id.usecase';
import { UpdateRequestGroupDto } from './usecases/update-request-group/update-request-group.dto';
import { UpdateRequestGroupUsecase } from './usecases/update-request-group/update-request-group.usecase';

@Controller()
@UseGuards(JwtAuthGuard)
export class RequestGroupController {
  constructor(
    private readonly createRequestGroupUsecase: CreateRequestGroupUsecase,
    private readonly findAllByWorkspaceUsecase: FindAllRequestGroupsByWorkspaceUsecase,
    private readonly findByIdUsecase: FindRequestGroupByIdUsecase,
    private readonly updateUsecase: UpdateRequestGroupUsecase,
    private readonly deleteUsecase: DeleteRequestGroupUsecase,
  ) {}

  @Post('workspaces/:workspaceId/request-groups')
  @UseGuards(WorkspaceOwnerGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Body() createRequestGroupDto: CreateRequestGroupDto,
  ): Promise<RequestGroup> {
    return this.createRequestGroupUsecase.execute(
      workspaceId,
      createRequestGroupDto,
    );
  }

  @Get('workspaces/:workspaceId/request-groups')
  @UseGuards(WorkspaceOwnerGuard)
  findAllByWorkspace(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
  ): Promise<RequestGroup[]> {
    return this.findAllByWorkspaceUsecase.execute(workspaceId);
  }

  @Get('request-groups/:id')
  @UseGuards(RequestGroupOwnerGuard)
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<RequestGroup> {
    return this.findByIdUsecase.execute(id);
  }

  @Patch('request-groups/:id')
  @UseGuards(RequestGroupOwnerGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRequestGroupDto: UpdateRequestGroupDto,
  ): Promise<RequestGroup> {
    return this.updateUsecase.execute(id, updateRequestGroupDto);
  }

  @Delete('request-groups/:id')
  @UseGuards(RequestGroupOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.deleteUsecase.execute(id);
  }
}

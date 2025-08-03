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
import { JwtAuthGuard } from '../infra/auth/jwt-auth.guard';
import { Request } from './request.entity';
import { CreateRequestDto } from './usecases/create/create-request.dto';
import { CreateRequestUsecase } from './usecases/create/create-request.usecase';
import { DeleteRequestUsecase } from './usecases/delete/delete-request.usecase';

import { UpdateRequestDto } from './usecases/update/update-request.dto';
import { UpdateRequestUsecase } from './usecases/update/update-request.usecase';
import { RequestGroupOwnerGuard } from '../common/request-group-owner.guard';
import { FindRequestByIdUsecase } from './usecases/find-many/find-request-by-id.usecase';


@Controller()
@UseGuards(JwtAuthGuard)
export class RequestController {
  constructor(
    private readonly createUsecase: CreateRequestUsecase,
    private readonly findByIdUsecase: FindRequestByIdUsecase,
    private readonly updateUsecase: UpdateRequestUsecase,
    private readonly deleteUsecase: DeleteRequestUsecase,
  ) {}

  @Post('request-groups/:requestGroupId/requests')
  @UseGuards(RequestGroupOwnerGuard) 
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(
    @Param('requestGroupId', ParseUUIDPipe) requestGroupId: string,
    @Body() createRequestDto: CreateRequestDto,
  ): Promise<Request> {
    return this.createUsecase.execute(requestGroupId, createRequestDto);
  }

  @Get('requests/:id')
  @UseGuards(RequestGroupOwnerGuard) 
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<Request> {
    return this.findByIdUsecase.execute(id);
  }

  @Patch('requests/:id')
  @UseGuards(RequestGroupOwnerGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRequestDto: UpdateRequestDto,
  ): Promise<Request> {
    return this.updateUsecase.execute(id, updateRequestDto);
  }

  @Delete('requests/:id')
  @UseGuards(RequestGroupOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.deleteUsecase.execute(id);
  }
}
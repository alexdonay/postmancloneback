import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestDto } from '../create/create-request.dto';


export class UpdateRequestDto extends PartialType(CreateRequestDto) {}
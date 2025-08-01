import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateRequestGroupDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;
}

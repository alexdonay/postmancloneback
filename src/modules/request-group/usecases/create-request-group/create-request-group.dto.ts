import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRequestGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;


}

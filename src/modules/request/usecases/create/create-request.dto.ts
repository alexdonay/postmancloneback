import { IsIn, IsNotEmpty, IsObject, IsOptional, IsString, IsUrl } from 'class-validator';
import { AuthenticationPayload } from '../../request.entity';

// Define os métodos HTTP válidos para a requisição
const validMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsIn(validMethods)
  @IsNotEmpty()
  method: string;

  @IsObject()
  @IsOptional()
  headers?: Record<string, any>;

  @IsObject()
  @IsOptional()
  body?: Record<string, any>;

  @IsObject()
  @IsOptional()
  authentication?: AuthenticationPayload;
}
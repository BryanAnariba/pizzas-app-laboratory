import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsUUID } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

  @IsUUID()
  public code: string;
  
}

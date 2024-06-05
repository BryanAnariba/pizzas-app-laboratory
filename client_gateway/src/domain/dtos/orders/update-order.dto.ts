import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsUUID } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  
  @IsUUID()
  public code: string;

}

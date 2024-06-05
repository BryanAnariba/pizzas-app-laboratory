import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsUUID } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {

  @IsUUID()
  code: string;
}

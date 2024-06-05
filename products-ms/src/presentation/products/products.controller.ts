import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({cmd: 'create_product'})
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern({cmd: 'find_all_products'})
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @MessagePattern({cmd: 'find_product'})
  findOne(@Payload('code', new ParseUUIDPipe()) code: string) {
    return this.productsService.findOne(code);
  }

  @MessagePattern({cmd: 'update_product'})
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto.code, updateProductDto);
  }

  @MessagePattern({cmd: 'delete_product'})
  remove(@Payload('code', new ParseUUIDPipe()) code: string) {
    return this.productsService.remove(code);
  }

  @MessagePattern({cmd: 'validate_order_products'})
  validateOrderProducts (@Payload() codes: string[]) {
    return this.productsService.validateProductsByCodes(codes);
  }
}

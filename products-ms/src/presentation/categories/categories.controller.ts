import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('categories')
export class CategoriesController {
  
  constructor(private readonly categoriesService: CategoriesService) {}

  @MessagePattern({cmd: 'create_category'})
  create(@Payload() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @MessagePattern({cmd: 'find_all_categories'})
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.categoriesService.findAll(paginationDto);
  }

  @MessagePattern({cmd: 'find_category'})
  findOne(@Payload('code', new ParseUUIDPipe()) code: string) {
    return this.categoriesService.findOne(code);
  }

  @MessagePattern({cmd: 'update_category'})
  update(@Payload() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(updateCategoryDto.code, updateCategoryDto);
  }

  @MessagePattern({cmd: 'delete_category'})
  remove(@Payload('code', new ParseUUIDPipe()) code: string) {
    return this.categoriesService.remove(code);
  }
}


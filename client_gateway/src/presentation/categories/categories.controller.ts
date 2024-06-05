import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { catchError } from 'rxjs';
import { ClientModuleNames } from 'src/enums';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateCategoryDto, PaginationDto, UpdateCategoryDto } from 'src/domain';

@Controller('categories')
export class CategoriesController {

  constructor (
    @Inject(ClientModuleNames.CATEGORY_SERVICE) private readonly categoriesClient: ClientProxy,
  ) {}

  @Post()
  createItem (@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesClient.send({cmd: 'create_category'}, createCategoryDto)
      .pipe(
        catchError(
          error => {
            throw new RpcException(error);
          }
        )
      )
  }

  @Get()
  findAllItems (@Query() paginationDto: PaginationDto) {
    return this.categoriesClient.send({cmd: 'find_all_categories'}, paginationDto);
  }

  @Get(':code')
  findItem (@Param('code', new ParseUUIDPipe()) code: string) {
    return this.categoriesClient.send({cmd: 'find_category'}, {code})
      .pipe(
        catchError(error => { 
          throw new RpcException(error);
        })
      );
  }

  @Patch(':code')
  updateItem (@Param('code', new ParseUUIDPipe()) code: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesClient.send({cmd: 'update_category'}, { code: code, ...updateCategoryDto })
      .pipe(
        catchError(
          error => {
            throw new RpcException(error);
          }
        )
      );
  }

  @Delete(':code')
  deleteItem (@Param('code', new ParseUUIDPipe()) code: string) {
    return this.categoriesClient.send({cmd: 'delete_category'}, {code})
      .pipe(
        catchError(
          error => {
            throw new RpcException(error);
          }
        )
      )
  }
}

import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { catchError } from 'rxjs';
import { ClientModuleNames } from 'src/enums';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateCategoryDto, PaginationDto, UpdateCategoryDto } from 'src/domain';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('categories')
export class CategoriesController {

  constructor (
    @Inject(ClientModuleNames.NATS_SERVICES) private readonly natsClient: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  createItem (@Body() createCategoryDto: CreateCategoryDto) {
    return this.natsClient.send({cmd: 'create_category'}, createCategoryDto)
      .pipe(
        catchError(
          error => {
            throw new RpcException(error);
          }
        )
      )
  }

  @UseGuards(AuthGuard)
  @Get()
  findAllItems (@Query() paginationDto: PaginationDto) {
    return this.natsClient.send({cmd: 'find_all_categories'}, paginationDto);
  }

  @UseGuards(AuthGuard)
  @Get(':code')
  findItem (@Param('code', new ParseUUIDPipe()) code: string) {
    return this.natsClient.send({cmd: 'find_category'}, {code})
      .pipe(
        catchError(error => { 
          throw new RpcException(error);
        })
      );
  }

  @UseGuards(AuthGuard)
  @Patch(':code')
  updateItem (@Param('code', new ParseUUIDPipe()) code: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.natsClient.send({cmd: 'update_category'}, { code: code, ...updateCategoryDto })
      .pipe(
        catchError(
          error => {
            throw new RpcException(error);
          }
        )
      );
  }

  @UseGuards(AuthGuard)
  @Delete(':code')
  deleteItem (@Param('code', new ParseUUIDPipe()) code: string) {
    return this.natsClient.send({cmd: 'delete_category'}, {code})
      .pipe(
        catchError(
          error => {
            throw new RpcException(error);
          }
        )
      )
  }
}

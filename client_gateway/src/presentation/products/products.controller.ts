import { join } from 'node:path';
import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, ParseUUIDPipe, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { catchError } from 'rxjs';
import { ClientModuleNames } from 'src/enums';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateProductDto, PaginationDto, UpdateProductDto } from 'src/domain';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { NodeFS, UUID } from 'src/config';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('products')
export class ProductsController {

  constructor (
    @Inject(ClientModuleNames.NATS_SERVICES) private readonly natsClient: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: (req, file, cb) => {
      if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
        cb(null, true);
      else {
        cb(new RpcException({status: HttpStatus.BAD_REQUEST, message: `Unsupported file type ${extname(file.originalname)}`}), false);
      }
    },
    storage: diskStorage({
      destination: `${join(__dirname+'../../../../../products-ms/uploads/products')}`,
      filename: (req, file, cb) => {
        const uuid = UUID.getUUID;
        cb(null, `${uuid}.${file.originalname.split('.').pop()}`);
      }
    }),
  }))
  createItem (@UploadedFile() file: Express.Multer.File, @Body() createProductDto: CreateProductDto) {
    return this.natsClient.send({cmd: 'create_product'}, {picture: file.filename, ...createProductDto})
      .pipe(
        catchError(
          error => {
            NodeFS.removeFile('products-ms', file.filename, 'products');
            throw new RpcException(error);
          }
        )
      )
  }

  @Get()
  findAllItems (@Query() paginationDto: PaginationDto) {
    return this.natsClient.send({cmd: 'find_all_products'}, paginationDto);
  }

  @Get(':code')
  findItem (@Param('code', new ParseUUIDPipe()) code: string) {
    return this.natsClient.send({cmd: 'find_product'}, {code})
      .pipe(
        catchError(error => { 
          throw new RpcException(error);
        })
      );
  }

  @UseGuards(AuthGuard)
  @Patch(':code')
  updateItem (@Param('code', new ParseUUIDPipe()) code: string, @Body() updateProductDto: UpdateProductDto) {
    return this.natsClient.send({cmd: 'update_product'}, { code: code, ...updateProductDto })
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
    return this.natsClient.send({cmd: 'delete_product'}, {code})
      .pipe(
        catchError(
          error => {
            throw new RpcException(error);
          }
        )
      )
  }
}

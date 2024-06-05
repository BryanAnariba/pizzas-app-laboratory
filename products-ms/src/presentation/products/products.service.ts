import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { Product } from './entities/product.entity';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('ProductsService');

  onModuleInit() {
    this.$connect();
    this.logger.log('DataBase Connected!');
  }

  private async getProductByName (name: string) {
    const product = await this.$queryRawUnsafe<Product[]>('SELECT * FROM "Product" WHERE "name" LIKE $1 AND "isDeleted" = $2', '%'+name.toUpperCase()+'%', false);
    return product[0];
  }

  private async getProductByNameAndCode (name: string, code: string) {
    const product = await this.$queryRawUnsafe<Product[]>('SELECT * FROM "Product" WHERE "name" LIKE $1 AND "isDeleted" = $2 AND "code" <> $3', '%'+name.toUpperCase()+'%', false, code);
    return product[0];
  }

  async create(createProductDto: CreateProductDto) {
    try {
      const productFound = await this.getProductByName(createProductDto.name);
      if (productFound) throw new RpcException({status: HttpStatus.BAD_REQUEST, message: `Category ${createProductDto.name} already exists!`});
      
      const existsCategory = await this.category.findFirst({where: {code: createProductDto.categoryId}});
      if (!existsCategory) throw new RpcException({status: HttpStatus.NOT_FOUND, message: `Category does not exists!`});
      
      const {name, ...product}  = createProductDto;

      return this.product.create({
        data: {
          name: name.toUpperCase(),
          ...product
        }
      });
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({status: HttpStatus.INTERNAL_SERVER_ERROR, message: error});
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const [products, totalProducts] = await Promise.all([
      this.product.findMany({
        take: limit,
        skip: page <= 0 ? 0 : page * limit,
        where: {
          isDeleted: false,
        },
        include: {
          category: {
            select: {
              name: true
            } 
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
      }),
      this.product.count({
        where: {
          isDeleted: false,
        },
      }),
    ]);

    return {
      products, 
      totalProducts,
    }
  }

  async findOne(code: string) {
    const product = await this.product.findFirst({
      where: {
        code: code, 
        isDeleted: false,
      },
      include: {
        category: {
          select: {
            name: true
          } 
        }
      },
    });
    if (!product) throw new RpcException({status: HttpStatus.NOT_FOUND, message: `Product does not exists!`});
    return product;
  }

  async update(code: string, updateProductDto: UpdateProductDto) {
    
    const productFound = await this.getProductByNameAndCode(updateProductDto.name, code);
    if (productFound) throw new RpcException({status: HttpStatus.BAD_REQUEST, message: `Category ${updateProductDto.name} already exists!`});

    const existsCategory = await this.category.findFirst({where: {code: updateProductDto.categoryId}});
    if (!existsCategory) throw new RpcException({status: HttpStatus.NOT_FOUND, message: `Category does not exists!`});

    await this.findOne(code);

    return await this.product.update({
      where: {
        code: code,
      },
      data: {
        name: updateProductDto.name.toUpperCase(),
        categoryId: updateProductDto.categoryId,
        price: updateProductDto.price,
        tax: updateProductDto.tax,
        quantityInStock: updateProductDto.quantityInStock,
        picture : updateProductDto.picture,
      }
    });
  }

  async remove(code: string) {
    await this.findOne(code);
    return await this.product.update({
      where: {
        code: code
      },
      data: {
        isDeleted: true,
      }
    });
  }

  async validateProductsByCodes (codes: string[]) {
    codes = Array.from(new Set(codes));

    const products = await this.product.findMany({
      where: {
        code: {
          in: codes
        },
      },
    });

    if (products.length !== codes.length) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Some products were not found'
      });
    }
    return products;
  }
}

import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CategoriesService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('CategoriesService');

  onModuleInit() {
    this.$connect();
    this.logger.log('DataBase Connected!');
  }

  private async getCategoryByName (name: string) {
    const category = await this.$queryRawUnsafe<Category[]>('SELECT * FROM "Category" WHERE "name" LIKE $1 AND "isDeleted" = $2', '%'+name.toUpperCase()+'%', false);
    return category[0];
  }

  private async getCategoryByNameAndCode (name: string, code: string) {
    const category = await this.$queryRawUnsafe<Category[]>('SELECT * FROM "Category" WHERE "name" LIKE $1 AND "isDeleted" = $2 AND "code" <> $3', '%'+name.toUpperCase()+'%', false, code);
    return category[0];
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryFound = await this.getCategoryByName(createCategoryDto.name);
    if (categoryFound) throw new RpcException({status: HttpStatus.BAD_REQUEST, message: `Category ${createCategoryDto.name} already exists!`});
    return this.category.create({
      data: {
        name: createCategoryDto.name.toUpperCase(),
      }
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const [categories, totalCategories] = await Promise.all([
      this.category.findMany({
        take: limit,
        skip: page <= 0 ? 0 : page * limit,
        where: {
          isDeleted: false,
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      this.category.count({
        where: {
          isDeleted: false,
        },
      }),
    ]);

    return {
      categories, 
      totalCategories,
    }
  }

  async findOne(code: string) {
    const category = await this.category.findFirst({
      where: {
        code: code, 
        isDeleted: false,
      }
    });
    if (!category) throw new RpcException({status: HttpStatus.NOT_FOUND, message: `Category does not exists!`});
    return category;
  }

  async update(code: string, updateCategoryDto: UpdateCategoryDto) {
    // console.log(updateCategoryDto)
    const categoryFound = await this.getCategoryByNameAndCode(updateCategoryDto.name, code);
    if (categoryFound) throw new RpcException({status: HttpStatus.BAD_REQUEST, message: `Category ${updateCategoryDto.name} already exists!`});
    await this.findOne(code);
    return await this.category.update({
      where: {
        code: code,
      },
      data: {
        name: updateCategoryDto.name.toUpperCase(),
      }
    });
  }

  async remove(code: string) {
    await this.findOne(code);
    return await this.category.update({
      where: {
        code: code
      },
      data: {
        isDeleted: true,
      }
    });
  }
}

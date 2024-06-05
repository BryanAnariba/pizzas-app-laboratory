import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { BCrypt } from 'src/config';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('UsersService');

  onModuleInit() {
    this.$connect();
    this.logger.log('DataBase Connected!');
  }

  async findUserByEmail (email: string) {
    const user = await this.user.findFirst({
      where: {
        email: email,
      }
    });
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.findUserByEmail(createUserDto.email);
    if (existUser) throw new RpcException({status: HttpStatus.BAD_REQUEST, message: `Email ${createUserDto.email} already exist!`});
    if (existUser && existUser.isDeleted) throw new RpcException({status: HttpStatus.BAD_REQUEST, message: `Inactive user, please contact the admin!`});

    const hashedPassword = BCrypt.encryptPassword('');
    return this.user.create({
      data: {
        name: createUserDto.name.toUpperCase(),
        email: createUserDto.email,
        password: hashedPassword,
        phone:  createUserDto.phone,
      },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const [users, totalUsers] = await Promise.all([
      this.user.findMany({
        take: limit,
        skip: page <= 0 ? 0 : page * limit,
        where: {
          isDeleted: false,
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      this.user.count({
        where: {
          isDeleted: false,
        },
      }),
    ]);

    return {
      users, 
      totalUsers,
    }
  }

  async findOne(code: string) {
    const user = await this.user.findFirst({
      where: {
        code: code, 
        isDeleted: false,
      },
    });
    if (!user) throw new RpcException({status: HttpStatus.NOT_FOUND, message: `User does not exists!`});
    return user;
  }

  async update(code: string, updateUserDto: UpdateUserDto) {
    const existUser = await this.findUserByEmail(updateUserDto.email);
    if (existUser && existUser.code !== code) throw new RpcException({status: HttpStatus.NOT_FOUND, message: `This email already in user in other account`});
    return await this.user.update({
      where: {
        code: code,
      },
      data: {
        name: updateUserDto.name.toUpperCase(),
        email: updateUserDto.email,
        password: BCrypt.encryptPassword(''),
        phone:  updateUserDto.phone,
      },
    })
  }

  async remove(code: string) {
    await this.findOne(code);
    return await this.user.update({
      where: {
        code: code
      },
      data: {
        isDeleted: true,
      }
    });
  }
}

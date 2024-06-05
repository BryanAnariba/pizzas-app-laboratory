import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { Address } from './interfaces/address.interfaces';

@Injectable()
export class AddressesService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('AddressService');

  onModuleInit() {
    this.$connect();
    this.logger.log('DataBase Connected!');
  }

  private async getAddressByName (name: string, userId: string) {
    const address = await this.$queryRawUnsafe<Address[]>('SELECT * FROM "Address" WHERE "name" LIKE $1 AND "isDeleted" = $2 AND "userId" = $3', '%'+name.toUpperCase()+'%', false, userId);
    return address[0];
  }

  async create(createAddressDto: CreateAddressDto) {
    const addressFound = await this.getAddressByName(createAddressDto.name, createAddressDto.userId);
    if (addressFound) throw new RpcException({status: HttpStatus.BAD_REQUEST, message: `Address ${createAddressDto.name} already exists!`});
    return this.address.create({
      data: {
        name: createAddressDto.name.toUpperCase(),
        userId: createAddressDto.userId,
      }
    });
  }

  async findOne(code: string) {
    const [address, totalAddresses] = await Promise.all([
      this.address.findMany({
        where: {
          userId: code,
          isDeleted: false,
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      this.address.count({
        where: {
          userId: code,
          isDeleted: false,
        },
      }),
    ]);

    return {
      address, 
      totalAddresses,
    }
  }

  async update(code: string, updateAddressDto: UpdateAddressDto) {
    const addressFound = await this.getAddressByName(updateAddressDto.name, updateAddressDto.userId);
    if (addressFound) throw new RpcException({status: HttpStatus.BAD_REQUEST, message: `Address ${updateAddressDto.name} already exists!`});
    return await this.category.update({
      where: {
        code: code,
      },
      data: {
        name: updateAddressDto.name.toUpperCase(),
      }
    });
  }

  async remove(code: string) {
    await this.findOne(code);
    return await this.address.update({
      where: {
        code: code
      },
      data: {
        isDeleted: true,
      }
    });
  }
}

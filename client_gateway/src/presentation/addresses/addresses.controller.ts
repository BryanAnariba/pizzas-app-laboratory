import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { CreateAddressDto, UpdateAddressDto } from 'src/domain';
import { ClientModuleNames } from 'src/enums';

@Controller('addresses')
export class AddressesController {

  constructor (
    @Inject(ClientModuleNames.ADDRESSES_SERVICES) private readonly addressClient: ClientProxy,
  ) {}
  
  @Post()
  createItem (@Body() createAddressDto: CreateAddressDto) {
    return this.addressClient.send({cmd: 'create_address'}, createAddressDto)
      .pipe(
        catchError(
          error => {
            throw new RpcException(error);
          }
        )
      )
  }

  @Get(':code')
  findItem (@Param('code', new ParseUUIDPipe()) code: string) {
    return this.addressClient.send({cmd: 'find_address'}, {code})
      .pipe(
        catchError(error => { 
          throw new RpcException(error);
        })
      );
  }

  @Patch(':code')
  updateItem (@Param('code', new ParseUUIDPipe()) code: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressClient.send({cmd: 'update_address'}, { code: code, ...updateAddressDto })
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
    return this.addressClient.send({cmd: 'delete_address'}, {code})
      .pipe(
        catchError(
          error => {
            throw new RpcException(error);
          }
        )
      )
  }
}

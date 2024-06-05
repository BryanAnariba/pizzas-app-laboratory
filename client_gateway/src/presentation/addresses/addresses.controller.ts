import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { CreateAddressDto, UpdateAddressDto } from 'src/domain';
import { ClientModuleNames } from 'src/enums';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('addresses')
export class AddressesController {

  constructor (
    @Inject(ClientModuleNames.NATS_SERVICES) private readonly natsClient: ClientProxy,
  ) {}
  
  @UseGuards(AuthGuard)
  @Post()
  createItem (@Body() createAddressDto: CreateAddressDto) {
    return this.natsClient.send({cmd: 'create_address'}, createAddressDto)
      .pipe(
        catchError(
          error => {
            throw new RpcException(error);
          }
        )
      )
  }

  @UseGuards(AuthGuard)
  @Get(':code')
  findItem (@Param('code', new ParseUUIDPipe()) code: string) {
    return this.natsClient.send({cmd: 'find_address'}, {code})
      .pipe(
        catchError(error => { 
          throw new RpcException(error);
        })
      );
  }

  @UseGuards(AuthGuard)
  @Patch(':code')
  updateItem (@Param('code', new ParseUUIDPipe()) code: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.natsClient.send({cmd: 'update_address'}, { code: code, ...updateAddressDto })
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
    return this.natsClient.send({cmd: 'delete_address'}, {code})
      .pipe(
        catchError(
          error => {
            throw new RpcException(error);
          }
        )
      )
  }
}

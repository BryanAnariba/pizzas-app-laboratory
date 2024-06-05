import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { CreateUserDto, PaginationDto, UpdateUserDto } from 'src/domain';
import { ClientModuleNames } from 'src/enums';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('users')
export class UsersController {

  constructor (
    @Inject(ClientModuleNames.NATS_SERVICES) private readonly natsClient: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  createItem (@Body() createUserDto: CreateUserDto) {
    return this.natsClient.send({cmd: 'create_user'}, createUserDto)
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
    return this.natsClient.send({cmd: 'find_all_users'}, paginationDto);
  }

  @UseGuards(AuthGuard)
  @Get(':code')
  findItem (@Param('code', new ParseUUIDPipe()) code: string) {
    return this.natsClient.send({cmd: 'find_user'}, {code})
      .pipe(
        catchError(error => { 
          throw new RpcException(error);
        })
      );
  }

  @UseGuards(AuthGuard)
  @Patch(':code')
  updateItem (@Param('code', new ParseUUIDPipe()) code: string, @Body() updateUserDto: UpdateUserDto) {
    return this.natsClient.send({cmd: 'update_user'}, { code: code, ...updateUserDto })
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
    return this.natsClient.send({cmd: 'delete_user'}, {code})
      .pipe(
        catchError(
          error => {
            throw new RpcException(error);
          }
        )
      )
  }
}

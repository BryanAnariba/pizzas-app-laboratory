import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { CreateUserDto, PaginationDto, UpdateUserDto } from 'src/domain';
import { ClientModuleNames } from 'src/enums';

@Controller('users')
export class UsersController {

  constructor (
    @Inject(ClientModuleNames.USERS_SERVICE) private readonly usersClient: ClientProxy,
  ) {}

  @Post()
  createItem (@Body() createUserDto: CreateUserDto) {
    return this.usersClient.send({cmd: 'create_user'}, createUserDto)
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
    return this.usersClient.send({cmd: 'find_all_users'}, paginationDto);
  }

  @Get(':code')
  findItem (@Param('code', new ParseUUIDPipe()) code: string) {
    return this.usersClient.send({cmd: 'find_user'}, {code})
      .pipe(
        catchError(error => { 
          throw new RpcException(error);
        })
      );
  }

  @Patch(':code')
  updateItem (@Param('code', new ParseUUIDPipe()) code: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersClient.send({cmd: 'update_user'}, { code: code, ...updateUserDto })
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
    return this.usersClient.send({cmd: 'delete_user'}, {code})
      .pipe(
        catchError(
          error => {
            throw new RpcException(error);
          }
        )
      )
  }
}

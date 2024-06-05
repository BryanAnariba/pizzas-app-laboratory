import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({cmd: 'create_user'})
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({cmd: 'find_all_users'})
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @MessagePattern({cmd: 'find_user'})
  findOne(@Payload('code', new ParseUUIDPipe()) code: string) {
    return this.usersService.findOne(code);
  }

  @MessagePattern({cmd: 'update_user'})
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.code, updateUserDto);
  }

  @MessagePattern({cmd: 'delete_user'})
  remove(@Payload('code', new ParseUUIDPipe()) code: string) {
    return this.usersService.remove(code);
  }
}

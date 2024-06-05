import { Controller, Get, Post, Body, Param, Inject, Query, Patch, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ClientModuleNames } from 'src/enums';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, PaginationDto, StatusDto } from 'src/domain';
import { catchError } from 'rxjs';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('orders')
export class OrdersController {
  
  constructor(
    @Inject(ClientModuleNames.NATS_SERVICES) private readonly natsClient: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.natsClient.send({cmd: 'create_order'}, createOrderDto)
    .pipe(
      catchError(
        error => {
          throw new RpcException(error);
        }
      )
    );
  }

  @UseGuards(AuthGuard)
  @Get('id/:id')
  findOne(@Param('code') code: string) {
    return this.natsClient.send({cmd: 'find_one_order'}, {code})
    .pipe(
      catchError(
        error => {
          throw new RpcException(error);
        }
      )
    );
  }

  @UseGuards(AuthGuard)
  @Get(':status/:userId')
  findAllByStatus(
    @Param('status') statusDto: StatusDto,
    @Param('userId') userId: ParseUUIDPipe,
    @Query() paginationDto: PaginationDto
  ) {
    return this.natsClient.send({cmd: 'find_all_orders'}, {status: statusDto.status, userId: userId, ...paginationDto})
    .pipe(
      catchError(
        error => {
          throw new RpcException(error);
        }
      )
    );
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  changeOrderStatus(
    @Param('id') id: string,
    @Body() statusDto: StatusDto,
  ) {
    return this.natsClient.send({cmd: 'delete_order'}, {id: id, status: statusDto.status})
    .pipe(
      catchError(
        error => {
          throw new RpcException(error);
        }
      )
    );
  }
}
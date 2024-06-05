import { Controller, Get, Post, Body, Param, Inject, Query, Patch, ParseUUIDPipe } from '@nestjs/common';
import { ClientModuleNames } from 'src/enums';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, PaginationDto, StatusDto } from 'src/domain';
import { catchError } from 'rxjs';

@Controller('orders')
export class OrdersController {
  
  constructor(
    @Inject(ClientModuleNames.NATS_SERVICES) private readonly natsClient: ClientProxy,
  ) {}

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
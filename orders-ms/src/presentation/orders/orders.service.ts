import { HttpStatus, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaClient } from '@prisma/client';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { OrderPaginationDto } from 'src/common/dto/order-pagination.dto';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';
import { ClientModuleNames } from 'src/enums';
import { firstValueFrom } from 'rxjs';
import { Product } from 'src/interfaces/product.interfaces';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {

  private logger = new Logger('Orders Service');

  constructor (
    @Inject(ClientModuleNames.NATS_SERVICES) private readonly natsClient: ClientProxy,
  ) {
    super();
  }

  onModuleInit() {
    this.$connect();
    this.logger.log('Orders Database connected!')
  }

  async create(createOrderDto: CreateOrderDto) {
    try {
      const productIds = createOrderDto.items.map(i => i.productId);
      const products: Product[] = await firstValueFrom(
        this.natsClient.send({cmd: 'validate_order_products'}, productIds)
      );
      
      const totalAmount = createOrderDto.items.reduce((acc, orderItem) => {
        const p = products.find((product) => product.code === orderItem.productId);
        return (p.price * orderItem.quantity + (p.price * orderItem.quantity * p.tax));
      }, 0);

      const totalItems = createOrderDto.items.reduce((acc, orderItem) => {
        return acc + orderItem.quantity
      }, 0);

      const order = await this.order.create({
        data: {
          totalAmount: totalAmount,
          totalItems: totalItems,
          userId: createOrderDto.userId,
          OrderDetail: {
            createMany: {
              data: createOrderDto.items.map((orderItem) => ({
                price: Number(products.find(productItem => productItem.code === orderItem.productId).price),
                productId: orderItem.productId,
                quantity: orderItem.quantity,
              }))             
            }
          }
        },
        include: {
          OrderDetail: {
            select: {
              id: true,
              price: true,
              quantity: true,
              productId: true,
            }
          }
        }
      });

      // TODO: restart de la tabla producto de cada producto la cantidad que el cliente se esta llevando y actualizar tabla
      // order.OrderDetail.forEach((orderItem) => ({
      //   name: products.find(product => product.code === orderItem.productId).name
      // }))

      return {
        ...order,
        OrderDetail: order.OrderDetail.map((orderItem) => ({
          ...orderItem,
          name: products.find(product => product.code === orderItem.productId).name
        }))
      };
    } catch (error) {
      throw new RpcException({status: HttpStatus.BAD_REQUEST, message: 'Sometime went wrong finding products for create the order' + error});
    }
  }

  async findAll(orderPaginationDto: OrderPaginationDto) {
    const { page, limit, status, userId } = orderPaginationDto;
    const [orders, totalOrders] = await Promise.all([
      this.order.findMany({
        where: {
          userId: userId,
          status: status
        },
        take: limit,
        skip: page <= 0 ? 0 : page * limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      this.order.count({
        where: {
          userId: userId,
          status: status
        },
      }),
    ]);

    return {
      orders, 
      totalOrders,
    }
  }

  async findOne(id: string) {
    const order = await this.order.findFirst({
      where: {
        id: id
      },
      include: {
        OrderDetail: {
          select: {
            id: true,
            price: true, 
            quantity: true,
            productId: true,
          }
        }
      }
    });
    if (!order) {
      throw new RpcException({status: HttpStatus.NOT_FOUND, message: 'Order not found'});
    }

    // Obtenemos los codigos de los productos
    const productIds = order.OrderDetail.map(orderDet => orderDet.productId);

    // Verificamos que existan
    const products: Product[] = await firstValueFrom(
      this.natsClient.send({cmd: 'validate_order_products'}, productIds)
    );

    return {
      ...order,
      // mapeamos la orden buscando los productos y poniendo el nombre
      OrderDetail: order.OrderDetail.map(orderDet => ({
        ...orderDet,
        name: products.find(product => product.code === orderDet.productId).name,
      }))
    };
    
  }

  changeOrderStatus(changeOrderStatusDto: ChangeOrderStatusDto) {
    this.findOne(changeOrderStatusDto.id);
    return this.order.update({
      where: {
        id: changeOrderStatusDto.id,
      },
      data: {
        status: changeOrderStatusDto.status,
      }
    })
  }
}

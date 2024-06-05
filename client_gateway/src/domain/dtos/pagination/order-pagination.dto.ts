import { IsEnum, IsOptional } from "class-validator"
import { PaginationDto } from "./pagination.dto"
import { OrderStatus, OrderStatusList } from "src/presentation/orders/enums/order.enum"

export class OrderPaginationDto extends PaginationDto {

  @IsOptional()
  @IsEnum(OrderStatusList, {message: `Valid status are: ${OrderStatusList}`})
  status: OrderStatus;

}
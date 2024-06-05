import { OrderStatus } from "@prisma/client";
import { IsEnum, IsOptional, IsUUID } from "class-validator"
import { OrderStatusList } from "src/presentation/orders/enums/order.enum";
import { PaginationDto } from "./pagination.dto";

export class OrderPaginationDto extends PaginationDto {

  @IsOptional()
  @IsEnum(OrderStatusList, {message: `Valid status are: ${OrderStatusList}`})
  status: OrderStatus;

  @IsUUID()
  userId: string;
  
}
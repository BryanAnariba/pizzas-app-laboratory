import { IsEnum, IsNotEmpty } from "class-validator";
import { OrderStatusList } from "../enums/order.enum";
import { OrderStatus } from "@prisma/client";

export class ChangeOrderStatusDto {

  @IsNotEmpty()
  id: string;

  @IsEnum(OrderStatusList, {message: `Valid order status: ${OrderStatusList}`})
  status: OrderStatus;
  
}
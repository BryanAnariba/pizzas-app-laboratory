import { OrderStatus } from "@prisma/client";

export const OrderStatusList = [
  OrderStatus.DELIVERED,
  OrderStatus.PENDING,
  OrderStatus.CANCELED,
]
import { IsNumber, IsPositive, IsUUID } from "class-validator";

export class OrderItemDto {

  @IsUUID()
  productId: string;

  @IsNumber()
  @IsPositive()
  quantity: number; 

  @IsNumber()
  price: number
}
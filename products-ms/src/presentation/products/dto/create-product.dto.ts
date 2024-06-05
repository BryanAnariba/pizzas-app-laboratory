import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Min } from "class-validator"

export class CreateProductDto {

  @IsUUID()
  @IsNotEmpty()
  public categoryId: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsPositive()
  @Min(0)
  @Type(() => Number)
  public price: number;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsPositive()
  @Min(0)
  @Type(() => Number)
  public tax: number;

  @IsPositive()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  public quantityInStock: number;

  @IsString()
  @IsOptional()
  public picture: string;
}

import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class PaginationDto {

  @IsOptional()
  @Type(() => Number)
  page?: number = 0;

  @IsOptional()
  @Type(() => Number)
  limit?: number = 5;
  
}
import { IsNotEmpty, IsString } from "class-validator"

export class CreateAddressDto {
  
  @IsString()
  @IsNotEmpty()
  public userId: string;

  @IsString()
  @IsNotEmpty()
  public name: string;
  
}

import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsString()
  public phone: string;
  
}
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class SignInDto {

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;

}
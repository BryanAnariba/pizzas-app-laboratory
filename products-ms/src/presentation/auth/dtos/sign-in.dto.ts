import { IsEmail, IsString } from "class-validator";

export class SignInDto {

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;

}
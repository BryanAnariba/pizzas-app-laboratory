import { IsEmail, IsEnum, IsString, IsStrongPassword } from "class-validator";
import { Role } from "src/enums";

export class SignUpDto {

  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsEnum(Role)
  role: Role;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;

}
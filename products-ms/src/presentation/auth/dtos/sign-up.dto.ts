import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsString, IsStrongPassword } from "class-validator";

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
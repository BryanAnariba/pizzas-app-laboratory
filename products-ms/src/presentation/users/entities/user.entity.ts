import { Role } from "@prisma/client";

export class User {

  public code: string;
  public name: string;
  public email: string;
  public password: string;
  public phone: string;
  public role: Role;
  public isDeleted: boolean;
  public createdAt: Date;
  public updatedAt: Date;

}

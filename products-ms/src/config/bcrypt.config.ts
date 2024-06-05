import { compareSync, genSaltSync, hashSync } from "bcryptjs";

export class BCrypt {

  public static encryptPassword (password: string): string {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }

  public static comparePasswords (password: string, hashedPassword: string): boolean {
    return compareSync(password, hashedPassword);
  }
}
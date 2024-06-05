import { genSaltSync, hashSync } from "bcryptjs";

export class BCrypt {

  public static encryptPassword (password: string): string {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }
}
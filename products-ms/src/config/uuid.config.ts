import { v4 as uuidv4 } from 'uuid';

export class UUID {

  public static get getUUID (): string {
    return uuidv4();
  }
}
import * as fs from 'node:fs';
import { join } from 'path';

export class NodeFS {

  public static removeFile(microservice: string, fileName: string, folder: string) {
    const imgPath = join(__dirname+`../../../../${microservice}/uploads/${folder}/${fileName}`);
    console.log(imgPath)
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }
  }
}
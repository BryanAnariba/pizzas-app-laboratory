import multer, { diskStorage } from "multer";
import { extname, join } from "path";
import { UUID } from "./uuid.config";
import { RpcException } from "@nestjs/microservices";
import { HttpStatus } from "@nestjs/common";

const PATH_STORAGE = join(__dirname+'../../../../../products-ms/uploads/products')

const storage = diskStorage({
  destination: `${PATH_STORAGE}`,
  filename: (req, file, cb) => {
    const uuid = UUID.getUUID;
    cb(null, `${uuid}.${file.originalname.split('.').pop()}`);
  }
});

const multerConfig = multer({ 
  storage: storage, 
  fileFilter: (req, file, cb) => {
    if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
      cb(null, true);
    else {
      cb(new RpcException({status: HttpStatus.BAD_REQUEST, message: `Unsupported file type ${extname(file.originalname)}`}));
    }
  }
});

export {multerConfig};
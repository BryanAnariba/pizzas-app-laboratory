import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientModuleNames } from 'src/enums';
import { envs } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      { 
        name: ClientModuleNames.PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.product_ms_host,
          port: envs.product_ms_port,
        }
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}

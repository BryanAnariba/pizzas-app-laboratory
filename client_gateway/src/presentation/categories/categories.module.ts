import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientModuleNames } from 'src/enums';
import { envs } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      { 
        name: ClientModuleNames.CATEGORY_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.product_ms_host,
          port: envs.product_ms_port,
        }
      },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [],
})
export class CategoriesModule {}

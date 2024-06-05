import { Module } from '@nestjs/common';
import { AddressesController } from './addresses.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientModuleNames } from 'src/enums';
import { envs } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ClientModuleNames.ADDRESSES_SERVICES,
        transport: Transport.TCP,
        options: {
          host: envs.product_ms_host,
          port: envs.product_ms_port,
        }
      }
    ])
  ],
  controllers: [AddressesController],
  providers: [],
})
export class AddressesModule {}

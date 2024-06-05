import { Module } from '@nestjs/common';
import { AddressesController } from './addresses.controller';
import { NatsModule } from '../transports/nats.module';

@Module({
  imports: [
    NatsModule,
  ],
  controllers: [AddressesController],
  providers: [],
})
export class AddressesModule {}

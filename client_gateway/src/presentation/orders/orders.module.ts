import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { NatsModule } from '../transports/nats.module';

@Module({
  imports: [
    NatsModule,
  ],
  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}

import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { NatsModule } from '../transports/nats.module';

@Module({
  imports: [
    NatsModule,
  ],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}

import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';
import { OrdersModule } from './orders/orders.module';
import { NatsModule } from './transports/nats.module';

@Module({
  imports: [
    CategoriesModule, 
    ProductsModule, 
    UsersModule, 
    AddressesModule, 
    OrdersModule, 
    NatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

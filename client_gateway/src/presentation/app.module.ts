import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [
    CategoriesModule, 
    ProductsModule, 
    UsersModule, 
    AddressesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

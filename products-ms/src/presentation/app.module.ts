import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [
    AppModule, 
    ProductsModule, 
    CategoriesModule, 
    UsersModule, 
    AddressesModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

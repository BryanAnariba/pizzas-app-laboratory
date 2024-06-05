import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListPageComponent } from './product-list-page/product-list-page.component';
import { MaterialModule } from '../../../material/material.module';
import { ProductListItemComponent } from './components/product-list-item/product-list-item.component';


@NgModule({
  declarations: [
    ProductListPageComponent,
    ProductListItemComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
  ],
  exports: [
    ProductListPageComponent,
  ]
})
export class ProductsModule { }

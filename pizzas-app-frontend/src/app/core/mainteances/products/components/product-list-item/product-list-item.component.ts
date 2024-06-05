import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces';

@Component({
  selector: 'app-mainteances-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrl: './product-list-item.component.css'
})
export class ProductListItemComponent {

  @Input()
  public product!: Product;
}

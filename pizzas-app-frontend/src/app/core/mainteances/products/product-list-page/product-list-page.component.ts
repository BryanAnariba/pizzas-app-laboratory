import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { Product } from '../interfaces';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-mainteances-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrl: './product-list-page.component.css'
})
export class ProductListPageComponent implements OnInit {

  public items: string[] = ['BEBIDAS FRIAS', 'PIZZA', 'PAPADIA', 'LASAGNA', 'BEBIDAS CALIENTES', 'PASTAS', 'ALITAS', 'PASTELES', 'HELADOS'];
  public products: Product[] = [
    {
      code: '1',
      name: 'Product 1',
      price: 399.99,
      quantityInStock: 15,
      picture: './assets/images/img-not-found.png',
      tax: 0.15,
      category: {
        code: 'abc-123',
        name: 'Category 1'
      },
    },
    {
      code: '2',
      name: 'Product 2',
      price: 399.99,
      quantityInStock: 15,
      picture: './assets/images/img-not-found.png',
      tax: 0.15,
      category: {
        code: 'abc-123',
        name: 'Category 1'
      },
    },
    {
      code: '3',
      name: 'Product 3',
      price: 399.99,
      quantityInStock: 15,
      picture: './assets/images/img-not-found.png',
      tax: 0.15,
      category: {
        code: 'abc-123',
        name: 'Category 1'
      },
    },
    {
      code: '4',
      name: 'Product 4',
      price: 399.99,
      quantityInStock: 15,
      picture: './assets/images/img-not-found.png',
      tax: 0.15,
      category: {
        code: 'abc-123',
        name: 'Category 1'
      },
    },
    {
      code: '5',
      name: 'Product 5',
      price: 399.99,
      quantityInStock: 15,
      picture: './assets/images/img-not-found.png',
      tax: 0.15,
      category: {
        code: 'abc-123',
        name: 'Category 1'
      },
    },
    {
      code: '6',
      name: 'Product 6',
      price: 399.99,
      quantityInStock: 15,
      picture: './assets/images/img-not-found.png',
      tax: 0.15,
      category: {
        code: 'abc-123',
        name: 'Category 1'
      },
    },
    {
      code: '7',
      name: 'Product 7',
      price: 399.99,
      quantityInStock: 15,
      picture: './assets/images/img-not-found.png',
      tax: 0.15,
      category: {
        code: 'abc-123',
        name: 'Category 1'
      },
    },
    {
      code: '8',
      name: 'Product 8',
      price: 399.99,
      quantityInStock: 15,
      picture: './assets/images/img-not-found.png',
      tax: 0.15,
      category: {
        code: 'abc-123',
        name: 'Category 1'
      },
    },
    {
      code: '9',
      name: 'Product 9',
      price: 399.99,
      quantityInStock: 15,
      picture: './assets/images/img-not-found.png',
      tax: 0.15,
      category: {
        code: 'abc-123',
        name: 'Category 1'
      },
    },
    {
      code: '10',
      name: 'Product 10',
      price: 399.99,
      quantityInStock: 15,
      picture: './assets/images/img-not-found.png',
      tax: 0.15,
      category: {
        code: 'abc-123',
        name: 'Category 1'
      },
    },
  ];

  public totalProducts: number = this.products.length;
  public limitOptions: number[] = [2,5,10];
  public pageIndex: number = 0;
  public limit: number = 5;
  public pageSize: number = this.limit;

  constructor (public readonly spinnerService: SpinnerService) {}

  ngOnInit(): void {
    // this.spinnerService.changeSpinner(false);
  }

  public onChangePage(pageOptions: PageEvent): void {
    this.pageIndex = pageOptions.pageIndex;
    this.pageSize = pageOptions.pageSize;
    console.log({index: this.pageIndex, size: this.pageSize});
  }
}

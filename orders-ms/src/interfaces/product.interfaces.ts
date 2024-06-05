export interface Product {

  code?: string;

  categoryId: string;

  name: string;

  price: number;
  
  tax: number;

  quantityInStock: number;

  picture: string;

  isDeleted: boolean;

  createdAt: Date;

  updatedAt: Date;

}
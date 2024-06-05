import { Category } from "../../categories/interfaces/categories.interfaces";

export interface Product {
    code: string;
    name: string;
    price: number;
    quantityInStock: number;
    picture: string;
    tax: number;
    category: Category;
}
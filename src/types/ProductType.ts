import { Category } from "./Category";

export interface Product extends SingleProduct {
  category: Category;
}

export interface SingleProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

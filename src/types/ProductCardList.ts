import { Product } from "./ProductType";
export interface ProductCardList {
  productsDisplayed: number;
  productList: Product[];
  params: string
}

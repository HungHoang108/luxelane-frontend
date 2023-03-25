export interface Product extends SingleProduct {
  categoryId: number;
}

export interface SingleProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  images: string[];
}

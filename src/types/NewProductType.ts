export interface NewProductType {
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
  categoryId: number;
}

export interface FileAndNewProductForm {
  file: File | null
  product: NewProductType
}
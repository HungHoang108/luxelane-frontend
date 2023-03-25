export interface NewProductType {
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
}

export interface FileAndNewProductForm {
  file: File | null
  product: NewProductType
}
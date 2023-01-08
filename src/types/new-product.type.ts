export interface NewProductType {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export interface FileAndNewProductForm {
  file: FileList | null
  product: NewProductType
}
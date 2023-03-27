import {Product} from './ProductType'
export interface Category {
    id : number
    name: string
    image: string
    product: Product[]
}

export interface fetchCategory {
    categories: Category[],
    status: 'idle',
    error: null,
}
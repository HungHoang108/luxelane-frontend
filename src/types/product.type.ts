import { Category } from "./category.types"

export interface Product {
    id : number
    title: string
    price: number
    description: string
    category: Category
    images: string[]
    // image: string

}


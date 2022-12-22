import React from 'react'
import ProductCard from '../product-card/product-card.component'

const ProductList = () => {
  return (
    <div>
      <ProductCard title='All Products' productsDisplayed={15}/>
    </div>
  )
}

export default ProductList
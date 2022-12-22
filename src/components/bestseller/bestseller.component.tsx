// import { useEffect } from "react";

// import { useAppSelector, useAppDispatch } from "../../hooks/reduxHook";

// import { fetchAllProducts } from "../../redux/products-reducer";

// import "./bestseller.component.styles.scss";

// const Bestseller = () => {
//   const products = useAppSelector((state) => state.productReducer);


//   return (
//     <>
//       <h1>BestSeller</h1>
//       <div className="products">
//         {products.slice(0, 15).map((product) => (
//           <div className="products-card">
//             <img src={product.images[0]} alt="" />
//             <h4>{product.title}</h4>
//             <h4>{product.price} $</h4>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Bestseller;

import React from 'react'
import ProductCard from '../product-card/product-card.component'
import "./bestseller.component.styles.scss"

const Bestseller = () => {
  return (
    <div>
      <ProductCard title='Bestseller' productsDisplayed={12}/>
    </div>
  )
}

export default Bestseller
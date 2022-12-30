import { useAppSelector } from "../../hooks/reduxHook";

import { useAppDispatch } from "../../hooks/reduxHook";
import { ProductCardList } from "../../types/product-cardlist";
import Button from "../button/button.component";
import { deleteItem } from "../../redux/products-reducer";

import "./product-card.component.styles.scss";

const ProductCard = ({ title, productsDisplayed }: ProductCardList) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productReducer);
  const sortCategory = useAppSelector((state) => state.SortReducer);
  const sortPrice = useAppSelector((state) => state.SortPriceReducer);

  const sortByCategoryArray = () => {
    if (!sortCategory) {
      return products;
    }

    const isCategoryExist = products.find(
      (item) => item.category.name === sortCategory
    );
    if (isCategoryExist) {
      return products.filter((item) => item.category.name === sortCategory);
    } else {
      return products;
    }
  };
  const test = sortByCategoryArray();
  const sortByPrice = () => {
    if (sortPrice === "price-up") {
      console.log("sort through");
      return test.sort((a, b) => a.price - b.price);
    } else if (sortPrice === "price-down") {
      return test.sort((a, b) => b.price - a.price);
    }
  };
  sortByPrice();

  return (
    <>
      <h1>{title}</h1>
      <div className="products">
        {test.slice(1, productsDisplayed).map((product) => (
          <div key={product.id} className="products-card">
            <img src={product.images[0]} alt="" />
            <h4>{product.title}</h4>
            <h4>{product.price} $</h4>
            <Button
              id={product.id}
              itemName={product.title}
              image={product.images[0]}
              price={product.price}
              amount={1}
            />
            <button onClick={()=>{dispatch(deleteItem({product}))}}>delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductCard;

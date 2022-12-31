import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../hooks/reduxHook";
import { useAppDispatch } from "../../hooks/reduxHook";
import { ProductCardList } from "../../types/product-cardlist";
import Button from "../button/button.component";
import { deleteItem } from "../../redux/products-reducer";
import ProductEditForm from "../product-editing-form/productEdit-form.component";

import "./product-card.component.styles.scss";

const ProductCard = ({ title, productsDisplayed }: ProductCardList) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productReducer);
  const sortCategory = useAppSelector((state) => state.SortReducer);
  const sortPrice = useAppSelector((state) => state.SortPriceReducer);

  const [role, setRole] = useState("");
  const [popup, setPopup] = useState(false);
  const [popupId, setPopupId] = useState(0);

  const nav = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    userRole && setRole(userRole);
  }, []);

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
            {role && (
              <button
                onClick={() => {
                  dispatch(deleteItem({ product }));
                }}
              >
                delete
              </button>
            )}
            {role && (
              <button
                onClick={() => {
                  setPopup(true);
                  setPopupId(product.id)
                  // nav("/editproduct");
                }}
              >
                Edit
              </button>
            )}
            {popupId === product.id && (
              <ProductEditForm
                open={popup}
                onClose={() => setPopup(false)}
                title={product.title}
                price={product.price}
                description={product.description}
                id={product.id}
                images={product.images}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductCard;

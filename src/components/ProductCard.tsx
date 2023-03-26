import { useState } from "react";
import { useNavigate } from "react-router";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { ProductCardList } from "../types/ProductCardList";
import Button from "./Button";
import {fetchAllProducts } from "../redux/productReducer";
import { deleteProduct } from "../redux/productReducer";
import ProductEditForm from "./ProductEditForm";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { fetchSingleProduct } from "../redux/singleProductReducer";

const ProductCard = ({ productList }: ProductCardList) => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const [popup, setPopup] = useState(false);
  const [popupId, setPopupId] = useState(0);
  const [hoveredProductId, setHoveredProductId] = useState<null | Number>(null);

  const userRole = localStorage.getItem("userProfile");
  const userData = userRole && JSON.parse(userRole);
  const getRole = userData && userData.role;

  const handleMouseEnter = (productId: number) => {
    setHoveredProductId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  return (
    <div className="products">
      {productList.map((product) => (
          <div onMouseEnter={() => handleMouseEnter(product.id)} onMouseLeave={handleMouseLeave} key={product.id} className="products-card">
            <img
              src={product.images[0]}
              onClick={() => {
                dispatch(fetchSingleProduct(product.id));
                nav("/singleItemRoute");
                return;
              }}
            />
            <div
              className="products-title-price"
              onClick={() => {
                dispatch(fetchSingleProduct(product.id));
                nav("/singleItemRoute");
                return;
              }}
            >
              <h4>{product.name}</h4>
              <span>{product.price} $</span>
            </div>
            <div className="product-card-button">
              <div>
                <Button id={product.id} itemName={product.name} image={product.images[0]} price={product.price} amount={1} />
              </div>
              <div className="card-button_edit_deletebox">
                {hoveredProductId === product.id && getRole === "Admin" && (
                  <button
                    className="edit-delete-button"
                    onClick={() => {
                      const id = product.id;
                      dispatch(deleteProduct(id)).then(res => dispatch(fetchAllProducts()))
                    }}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </button>
                )}
                {hoveredProductId === product.id && getRole === "Admin" && (
                  <button
                    className="edit-delete-button"
                    onClick={() => {
                      setPopup(true);
                      setPopupId(product.id);
                    }}
                  >
                    <ModeEditOutlinedIcon />
                  </button>
                )}
              </div>
            </div>

            {popupId === product.id && (
              <ProductEditForm
                open={popup}
                onClose={() => setPopup(false)}
                name={product.name}
                price={product.price}
                description={product.description}
                quantity={product.quantity}
                id={product.id}
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default ProductCard;

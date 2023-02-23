import { useState } from "react";
import { useNavigate } from "react-router";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { ProductCardList } from "../types/ProductCardList";
import Button from "./Button";
import { deleteItem } from "../redux/productReducer";
import { deleteProduct } from "../redux/productReducer";
import ProductEditForm from "./ProductEditForm";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { fetchSingleProduct } from "../redux/singleProductReducer";

const ProductCard = ({ productsDisplayed, productList, params }: ProductCardList) => {
  const dispatch = useAppDispatch();
  const sortCategory = useAppSelector((state) => state.SortReducer);
  const nav = useNavigate();

  const [popup, setPopup] = useState(false);
  const [popupId, setPopupId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [showButton, setShowButton] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState<null | Number>(null);

  const userRole = localStorage.getItem("userInfo");
  const userData = userRole && JSON.parse(userRole);
  const getRole = userData && userData.role;

  const handleMouseEnter = (productId: number) => {
    setHoveredProductId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  const sortByCategoryArray = () => {
    if (!sortCategory) {
      return productList;
    }
    const isCategoryExist = productList.find((item) => item.category.name === sortCategory);
    if (isCategoryExist) {
      return productList.filter((item) => item.category.name === sortCategory);
    } else {
      return productList;
    }
  };
  return (
    <div className="products">
      {sortByCategoryArray()
        .slice(1, productsDisplayed)
        .map((product) => (
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
              <h4>{product.title}</h4>
              <span>{product.price} $</span>
            </div>
            <div className="product-card-button">
              <div>
                <Button id={product.id} itemName={product.title} image={product.images[0]} price={product.price} amount={1} />
              </div>
              <div className="card-button_edit_deletebox">
                {hoveredProductId === product.id && getRole === "admin" && params === "product-list" && (
                  <button
                    className="edit-delete-button"
                    onClick={() => {
                      const id = product.id;
                      dispatch(deleteProduct(id));
                      dispatch(deleteItem(id));
                    }}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </button>
                )}
                {hoveredProductId === product.id && getRole === "admin" && params === "product-list" && (
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
                title={product.title}
                price={product.price}
                description={product.description}
                id={product.id}
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default ProductCard;

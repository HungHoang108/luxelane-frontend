import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../hooks/reduxHook";
import { editProductThunk, fetchAllProducts } from "../redux/productReducer";

interface status {
  open: boolean;
  onClose: () => void;
  name: string;
  price: number;
  quantity: number;
  description: string;
  id: number;
}

const ProductEditForm = ({ open, onClose, name, price, description, id, quantity }: status) => {
  const dispatch = useAppDispatch();
  const [editProduct, setEditProduct] = useState({
    id: id,
    name: name,
    price: price,
    quantity: quantity,
    description: description,
  });
  const [status, setStatus] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "price") {
      setEditProduct({
        ...editProduct,
        price: Number(value),
      });
    } else if (name === "quantity") {
      setEditProduct({
        ...editProduct,
        quantity: Number(value),
      });
    } else {
      setEditProduct((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditProduct((prev) => {
      return {
        ...prev,
        description: e.target.value,
      };
    });
  };

  const submitChanges = async () => {
    dispatch(editProductThunk(editProduct)).then((res) => {
      dispatch(fetchAllProducts());
      setStatus(!status);
      onClose();
    });
  };

  if (!open) return null;
  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <div className="modalRight">
          <p className="closeBtn" onClick={onClose}>
            X
          </p>
          <div className="content">
            <div>
              <h2>Edit Product</h2>
            </div>
            <div>
              <input type="text" name="name" placeholder="name" onChange={handleInputChange} value={editProduct.name} />
            </div>
            <div>
              <input type="number" name="price" placeholder="price" value={editProduct.price} onChange={handleInputChange} />
            </div>
            <div>
              <input
                type="number"
                name="quantity"
                placeholder="quantity"
                value={editProduct.quantity}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <textarea
                cols={50}
                rows={10}
                name="description"
                placeholder="Description"
                value={editProduct.description}
                onChange={handleTextareaChange}
              ></textarea>
            </div>
          </div>
          <div className="btnContainer">
            <button className="btnPrimary" onClick={submitChanges}>
              Submit Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEditForm;

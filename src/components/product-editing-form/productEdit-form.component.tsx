import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import "./productEdit.component.styles.scss";

interface status {
  open: boolean;
  onClose: () => void;
  title: string;
  price: number;
  description: string;
}

const ProductEditForm = ({
  open,
  onClose,
  title,
  price,
  description,
}: status) => {
  const [editProduct, setEditProduct] = useState({
    title: title,
    price: price,
    description: description,
    image: [],
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditProduct((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditProduct((prev) => {
      return {
        ...prev,
        description: e.target.value,
      };
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
              <input
                type="text"
                name="text"
                placeholder="title"
                onChange={handleInputChange}
                value={editProduct.title}
              />
            </div>
            <div>
              <input
                type="number"
                name="price"
                placeholder="price"
                value={editProduct.price}
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

            <div>
              <h4>image</h4>
              <input type="file" />
            </div>
          </div>
          <div className="btnContainer">
            <button className="btnPrimary">Submit Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEditForm;

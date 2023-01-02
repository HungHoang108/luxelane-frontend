import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import "./productEdit.component.styles.scss";
import { useAppDispatch } from "../../hooks/reduxHook";
import { editItem } from "../../redux/products-reducer";

interface status {
  open: boolean;
  onClose: () => void;
  title: string;
  price: number;
  description: string;
  id: number;
  //   images: string[];
  images: string;
}

const ProductEditForm = ({
  open,
  onClose,
  title,
  price,
  description,
  id,
  images,
}: status) => {
  const dispatch = useAppDispatch();
  const [editProduct, setEditProduct] = useState({
    id: id,
    title: title,
    price: price,
    description: description,
    images: images,
  });
  const [file, setFile] = useState<FileList | null>(null);
  const [status, setStatus] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "price") {
      setEditProduct({
        ...editProduct,
        price: Number(value),
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

  //adding image file
  const handleImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files);
  };

  const submitChanges = async () => {
    if (file) {
      await axios
        .post(
          "https://api.escuelajs.co/api/v1/files/upload",
          { file: file && file[0] },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) =>
          setEditProduct((prev) => {
            return {
              ...prev,
              //   images: [res.data.location],
              images: res.data.location,
            };
          })
        );
    }
    setStatus(!status);
    onClose();
  };

  const sendUpdate = async () => {
    dispatch(editItem(editProduct));
  };

  useEffect(() => {
    sendUpdate();
  }, [status]);

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
                name="title"
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
              <input
                type="file"
                name="image"
                onChange={handleImageFile}
                multiple
              />
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

import { ChangeEvent, useEffect, useState } from "react";

import { createProduct } from "../../redux/productReducer";
import { useAppDispatch } from "../../hooks/reduxHook";
import { NewProductType } from "../../types/NewProductType";

const NewProduct = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState(false);

  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<NewProductType>({
    title: "",
    price: 0,
    description: "",
    categoryId: 0,
    images: [],
  });

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProduct((prev) => {
      return {
        ...prev,
        description: e.target.value,
      };
    });
  };

  const handleImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files && setFile(e.target.files[0]);
    console.log(e.target.files);
  };

  const newItemForm = {
    file: file,
    product: product,
  };
  const submitProduct = () => {
    dispatch(createProduct(newItemForm));
    setStatus(true);
  };
  const addMoreItem = () => {
    setStatus(false);
  };

  return (
    <div>
      {status ? (
        <div className="newProduct-response">
          <h3>Your product has been added</h3>
          <button onClick={addMoreItem}>Add more items</button>
        </div>
      ) : (
        <div className="newProduct-conntainer">
          <h2>Create a new product</h2>
          <div>
            <label htmlFor="title"></label>
            <input
              id="title"
              type="text"
              name="title"
              onChange={handleChangeInput}
              placeholder="title"
            />
          </div>
          <div>
            <input
              type="number"
              name="price"
              placeholder="price"
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <input
              type="number"
              name="categoryId"
              placeholder="categoryId"
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <textarea
              cols={80}
              rows={20}
              name="description"
              placeholder="Description"
              onChange={handleTextareaChange}
            ></textarea>
          </div>
          <div>
            <span>
              <i>
                <b>Upload images:</b>
              </i>
            </span>
            <input
              type="file"
              name="image"
              onChange={handleImageFile}
              multiple
            />
          </div>
          <div>
            <button onClick={submitProduct}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewProduct;

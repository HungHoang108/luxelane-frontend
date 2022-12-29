import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { NewProductType } from "../../../types/new-product.type";

const NewProduct = () => {
  // const nav = useNavigate();
  const [file, setFile] = useState<FileList | null>(null);
  const [product, setProduct] = useState<NewProductType>({
    title: "",
    price: 0,
    description: "",
    categoryId: 0,
    images: [],
  });

  const { title, price, description, categoryId, images } = product;

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files);
  };
  const newItem = {
    title: title,
    price: price,
    description: description,
    categoryId: categoryId,
    images: images,
  };
  const submitProductImages = async () => {
    try {
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
          setProduct((prev) => {
            return {
              ...product,
              images: [res.data.location],
            };
          })
        );
    } catch (error) {
      console.log(error);
    }
  };

  const createProduct = async () => {
    if (file) {
      try {
        await axios
          .post("https://api.escuelajs.co/api/v1/products/", newItem)
          .then((res) => {
            console.log(res);
            // nav("/");
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    createProduct();
  }, [file]);

  return (
    <div>
      <div>
        <h2>Create your product</h2>
        <div>
          <input
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
            type="text"
            name="description"
            placeholder="description"
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
          <input type="file" name="image" onChange={handleImageFile} multiple />
        </div>
        <div>
          <button onClick={submitProductImages}>submit</button>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;

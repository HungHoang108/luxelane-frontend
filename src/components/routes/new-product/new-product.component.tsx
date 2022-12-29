import React from "react";

const NewProduct = () => {
  return (
    <div>
      <div>
        <h2>Create your product</h2>
        <div>
          <input
            type="text"
            name="title"
            // onChange={handleRegister}
            placeholder="title"
          />
        </div>
        <div>
          <input
            type="number"
            name="price"
            placeholder="price"
            // onChange={handleRegister}
          />
        </div>
        <div>
          <input
            type="text"
            name="description"
            placeholder="description"
            // onChange={handleRegister}
          />
        </div>
        <div>
          <input
            type="number"
            name="categoryId"
            placeholder="categoryId"
            // onChange={handleRegister}
          />
        </div>
        <div>
          <input
            type="file"
            name="image"
            // onChange={handleRegisterFile}
            multiple
          />
        </div>
        <div>
          <button>submit</button>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;

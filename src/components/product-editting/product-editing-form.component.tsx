import React from "react";

const ProductEditingForm = () => {
  return <div>
    <div><input type="text" placeholder="title" /></div>
    <div><input type="text" placeholder="description" /></div>
    <div><input type="number" placeholder="price" /></div>
    <div>
        <h4>image</h4>
        <input type="file"  /></div>
    


  </div>;
};

export default ProductEditingForm;

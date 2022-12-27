import { useAppSelector } from "../../../hooks/reduxHook";


import Button from "../../button/button.component";


const SearchResult = () => {
  const products = useAppSelector(state => state.productReducer);
  const searchQuery = useAppSelector(state => state.SearchTagReducer)

  return (
    <>
      <h1>Search Result</h1>
      <div className="products">
        {products.map(product => (
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
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchResult;

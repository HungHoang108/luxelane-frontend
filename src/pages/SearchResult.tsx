import { useAppSelector } from "../hooks/reduxHook";
import Button from "../components/Button";
import { useEffect } from "react";
import { fetchAllProducts } from "../redux/productReducer";
import { useAppDispatch } from "../hooks/reduxHook";

const SearchResult = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  const products = useAppSelector((state) => state.productReducer);
  const searchQuery = useAppSelector((state) => state.SearchTagReducer);
  const searchQueryLowerCase = searchQuery.toLowerCase();

  return (
    <div className="search-result-box">
      <h2>
        Search results for <i> {searchQuery ? searchQuery : "..."}</i>
      </h2>
      <div className="products">
        {searchQueryLowerCase.length > 1 ? (
          products.map((product) => {
            if (product.title.toLowerCase().includes(searchQueryLowerCase)) {
              return (
                <div key={product.id} className="products-card">
                  <img src={product.images[0]} />
                  <h4>{product.title}</h4>
                  <span>{product.price} $</span>
                  <Button id={product.id} itemName={product.title} image={product.images[0]} price={product.price} amount={1} />
                </div>
              );
            }
          })
        ) : (
          <div className="search-result-not-found">
            <p>Insert your search query</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;

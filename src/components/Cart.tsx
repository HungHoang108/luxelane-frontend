import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHook";

const Cart = () => {
  const cartItem = useAppSelector((state) => state.CartItemReducer);
  localStorage.setItem("cartItems", JSON.stringify(cartItem));
  const getCartItems = localStorage.getItem("cartItems");
  if (getCartItems) {
    var items = JSON.parse(getCartItems);
  }
  let counter = 0;
  const itemMap = () => {
    cartItem.map((item) => (counter += item.amount * item.price));
  };
  itemMap();
  localStorage.setItem("totalCost", JSON.stringify(counter));

  return (
    <div className="cartBox">
      <div className="cartBox-items">
        {items.map((item : any) => (
          <div className="cartBox-item" key={item.id}>
            <div>
              <img src={item.image} alt="" />
            </div>
            <div style={{ color: "black" }}>
              <p>{item.itemName}</p>
            </div>
            <div style={{ color: "black" }}>
              <span>{item.amount} x </span>
              <span>{item.price} $</span>
            </div>
          </div>
        ))}
      </div>
      <div className="cartBox-cost">Total: {counter} $</div>
      <div className="cartBox-button">
        <div>
          <Link className="link" to="cartpage">
            GO TO CART
          </Link>
        </div>
        <div>
          <Link className="link" to="cartpage">
            CHECKOUT
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;

import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHook";

import "./cart.component.styles.scss";

const Cart = () => {
  const cartItem = useAppSelector((state) => state.CartItemReducer);
let counter = 0
const itemMap = ()=> {
  cartItem.map(item => {
    counter += item.amount * item.price
  })}
  itemMap()
  localStorage.setItem("totalCost", JSON.stringify(counter))
  return (
    <div className="cartBox">
      <div className="cartBox-items">
        {cartItem.map((item) => (
          <div className="cartBox-item" key={item.id}>
            <div>
              <img src={item.image} alt="" />
            </div>
            <div>
              <p>{item.itemName}</p>
            </div>
            <div>
              <p>{item.amount} x</p>
              <p>{item.price} $</p>
            </div>
          </div>
        ))}
      </div>
      <div className="cartBox-cost">Total: {counter} $</div>
      <div className="cartBox-button">
        <div><Link className="link" to="cartpage">GO TO CART</Link></div>
        <div><Link className="link" to="cartpage">CHECKOUT</Link></div>
      </div>
    </div>
  );
};

export default Cart;

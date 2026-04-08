import axios from "axios";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, setCart, removeFromCart } = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const updateQty = (id, qty) => {
    setCart(
      cart.map(p =>
        p._id === id ? { ...p, qty: Math.max(1, qty) } : p
      )
    );
  };

  const total = cart.reduce(
    (sum, p) => sum + p.price * p.qty, 0
  );

  // const placeOrder = async () => {
  //   await axios.post("http://localhost:5000/api/orders/place", {
  //     userId: user.id,
  //     cart,
  //   });
  //   setSuccess(true);
  //   setTimeout(() => {
  //     alert("Order placed");
  //     setCart([]);
  //     navigate("/checkout");
  //   }, 1000);
  // };

 return (
  <div className="cart-page">
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.length === 0 && (
        <div className="empty-cart">Your cart is empty</div>
      )}

      {cart.map(p => (
        <div className="cart-item" key={p._id}>
          <div className="cart-product">
            <img
              src={p.images?.[0] || "https://via.placeholder.com/80"}
              alt={p.name}
              className="cart-img"
            />

            <div className="cart-info">
              <h4>{p.name}</h4>
              <p>Price: ₹{p.price}</p>
            </div>
          </div>


          <div className="cart-qty">
            <input
              type="number"
              min="1"
              value={p.qty}
              onChange={e =>
                updateQty(p._id, Number(e.target.value))
              }
            />
          </div>

          <div className="cart-price">
            ₹{p.price * p.qty}
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Total: ₹{total}</h3>
          <button
            className="place-order-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
          <button
  className="remove-btn"
  onClick={() => removeFromCart(p._id)}
>
  ❌
</button>

        </div>
        
      )}
      {success && (
  <div className="order-success">
    <div className="success-box">
      <div className="success-check">✔</div>
      <h3>Order Placed Successfully</h3>
    </div>
  </div>
)}

    </div>
  </div>
);

}

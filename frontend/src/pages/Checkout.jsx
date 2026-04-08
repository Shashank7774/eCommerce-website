import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

export default function Checkout() {
  const [success, setSuccess] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "COD"
  });

  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all details");
      return;
    }

    await axios.post("http://localhost:5000/api/orders/place", {
      userId: user.id,
      cart,
      deliveryDetails: {
        name: form.name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        pincode: form.pincode
      },
      paymentMethod: form.payment,
      orderTime: new Date().toLocaleString()
    });

    const ADMIN_PHONE = "9026947411";

    const message = `
    🛒 *NEW ORDER* 
    👨 Name: ${form.name}
    📞 Phone: ${form.phone}
    📍 Address: ${form.address}, ${form.city} - ${form.pincode}
    📦 Products: ${cart.map(p => `${p.name} (x${p.qty})`).join(", ")}
    🕒 Payment: ${form.payment}
    💰 Total: ₹${cart.reduce((sum, p) => sum + p.price * p.qty, 0)}`;

    const userMsg = `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(`https://wa.me/${form.phone}?text=${encodeURIComponent(userMsg)}`, "_blank");



    setSuccess(true);
    setTimeout(() => {
        setCart([]);
        navigate("/orders");
    }, 2200);
  
  };

  return (
    <div className="checkout-page">
              {success && (
          <div className="order-success-overlay">
            <div className="success-box">
              <div className="checkmark">✔</div>
              <h2>Order Placed Successfully</h2>
              <p>Thank you for shopping with us</p>
            </div>
          </div>
        )}

      <div className="checkout-container">

        {/* LEFT */}
        <div className="checkout-form">
          <h2>Delivery Details</h2>

          <input name="name" placeholder="Full Name" onChange={handleChange} />
          <input name="phone" placeholder="Mobile Number" onChange={handleChange} />
          <textarea name="address" placeholder="Full Address" onChange={handleChange} />

          <div className="row">
            <input name="city" placeholder="City" onChange={handleChange} />
            <input name="pincode" placeholder="Pincode" onChange={handleChange} />
          </div>

          <h3>Payment Method</h3>

          <div className="payment-methods">

            <label className={form.payment === "COD" ? "active" : ""}>
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={form.payment === "COD"}
                onChange={handleChange}
              />
              💵 Cash on Delivery
            </label>

            <label className={form.payment === "UPI" ? "active" : ""}>
              <input
                type="radio"
                name="payment"
                value="UPI"
                onChange={handleChange}
              />
              📱 UPI (GPay / PhonePe / Paytm)
            </label>

            <label className={form.payment === "CARD" ? "active" : ""}>
              <input
                type="radio"
                name="payment"
                value="CARD"
                onChange={handleChange}
              />
              💳 Credit / Debit Card
            </label>

            <label className={form.payment === "NETBANKING" ? "active" : ""}>
              <input
                type="radio"
                name="payment"
                value="NETBANKING"
                onChange={handleChange}
              />
              🏦 Net Banking
            </label>

          </div>
          {form.payment === "CARD" && (
            <div className="card-details">
              <input placeholder="Card Number" />
              <div className="row">
                <input placeholder="MM/YY" />
                <input placeholder="CVV" />
              </div>
            </div>
          )}

        </div>

        {/* RIGHT */}
        <div className="checkout-summary">
          <h3>Order Summary</h3>

          {cart.map(p => (
            <div className="summary-item" key={p._id}>
              <img src={p.images?.[0]} alt="" />
              <div>
                <p>{p.name}</p>
                <small>Qty: {p.qty}</small>
              </div>
              <strong>₹{p.price * p.qty}</strong>
            </div>
          ))}

          <div className="total">
            <span>Total</span>
            <strong>₹{total}</strong>
          </div>

          <button className="place-btn" onClick={placeOrder}>
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
}

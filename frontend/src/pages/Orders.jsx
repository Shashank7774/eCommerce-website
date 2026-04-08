import axios from "axios";
import { useEffect, useState } from "react";
import "./Orders.css";

export default function Orders() {
  const [openId, setOpenId] = useState(null);

  const cancelOrder = async (orderId) => {
  await axios.put(`http://localhost:5000/api/orders/cancel/${orderId}`);
  setOrders(orders.map(o =>
    o._id === orderId ? { ...o, status: "Cancelled" } : o
  ));
};

const returnOrder = async (orderId) => {
  await axios.put(`http://localhost:5000/api/orders/return/${orderId}`);
  setOrders(orders.map(o =>
    o._id === orderId ? { ...o, status: "Returned" } : o
  ));
};

  const user = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!user?.id) return;

    axios
      .get(`http://localhost:5000/api/orders/user/${user.id}`)
      .then(res => setOrders(res.data))
      .finally(() => setLoading(false))
      .catch(err => console.error(err));
  }, []);

    return (
  <div className="orders-page">
    <h2 className="orders-title">Your Orders</h2>

    {orders.map(order => (
      <div className={`order-card ${openId === order._id ? "open" : ""}`}>
        <button
  className="expand-btn"
  onClick={() =>
    setOpenId(openId === order._id ? null : order._id)
  }
>
  {openId === order._id ? "Hide Details ▲" : "View Details ▼"}
</button>



        {/* HEADER */}
        <div className="order-top">
          <div>
            <p className="order-id">Order ID: {order._id}</p>
            <p className="order-time">
              Ordered on {new Date(order.orderTime).toLocaleString()}
            </p>
          </div>

          <span className={`order-status ${order.status}`}>
            {order.status}
          </span>
        </div>

        {/* DELIVERY INFO */}
        {openId === order._id && (
  <div className="order-details animated-expand">

    <div className="order-info">
      <p><strong>Name:</strong> {order.deliveryDetails?.name}</p>
      <p><strong>Mobile:</strong> {order.deliveryDetails?.phone}</p>
      <p><strong>Address:</strong> {order.deliveryDetails?.address}</p>
      <p><strong>Payment:</strong> {order.paymentMethod}</p>
    </div>

    <div className="order-products">
      {order.products.map((p, i) => (
        <div className="order-product" key={i}>
          <img src={p.image} alt={p.name} />
          <div>
            <h4>{p.name}</h4>
            <p>Qty: {p.qty}</p>
            <p className="price">₹{p.price}</p>
          </div>
        </div>
      ))}
    </div>

  </div>
)}

        {/* TRACKING BAR */}
        <div className="tracking-bar">
          {["Placed", "Shipped", "Delivered"].map(step => (
            <div
              key={step}
              className={`track-step ${
                order.status === step || 
                (order.status === "Delivered" && step !== "Placed")
                  ? "active"
                  : ""
              }`}
            >
              {step}
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="order-footer">
          <strong>Total: ₹{order.totalAmount}</strong>

          {order.status === "Placed" && (
            <button
              className="cancel-btn"
              onClick={() => cancelOrder(order._id)}
            >
              Cancel Order
            </button>
          )}
        </div>

      </div>
    ))}
  </div>
);

}

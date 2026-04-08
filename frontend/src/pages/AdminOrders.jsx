import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminOrders.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || !user.isAdmin) {
      alert("Admin access only");
      navigate("/");
      return;
    }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get(
      "https://raja-fashion-clothing.onrender.com/api/orders/admin/all"
    );
    setOrders(res.data);
  };

  const updateStatus = async (orderId, newStatus) => {
    await axios.put(
      `https://raja-fashion-clothing.onrender.com/api/orders/update-status/${orderId}`,
      { status: newStatus }
    );

    setOrders(orders.map(o =>
      o._id === orderId ? { ...o, status: newStatus } : o
    ));
  };

  return (
    <div className="admin-orders-page">
      <h2>📦 Admin Orders Dashboard</h2>

      {orders.map(order => (
        <div className="admin-order-card" key={order._id}>
          
          {/* HEADER */}
          <div className="admin-order-header">
            <div>
              <h4>Order ID</h4>
              <p>{order._id}</p>
            </div>

            <span className={`order-status ${order.status}`}>
              {order.status}
            </span>
          </div>

          {/* CUSTOMER */}
          <div className="admin-section">
            <h4>👤 Customer Details</h4>
            <p><b>Email:</b> {order.userId?.email}</p>
            <p><b>Name:</b> {order.deliveryDetails?.name}</p>
            <p><b>📞 Phone:</b> {order.deliveryDetails?.phone}</p>
            <p>
              <b>📍 Address:</b> {order.deliveryDetails?.address},
              {order.deliveryDetails?.city} - {order.deliveryDetails?.pincode}
            </p>
            <p><b>💳 Payment:</b> {order.paymentMethod}</p>
          </div>

          {/* PRODUCTS */}
          <div className="admin-section">
            <h4>🛒 Products</h4>
            {order.products.map((p, i) => (
              <div className="admin-product-row" key={i}>
                <img src={p.image} alt={p.name} />
                <div>
                  <p className="product-name">{p.name}</p>
                  <p>Qty: {p.qty}</p>
                  <p>₹{p.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="admin-order-footer">
            <strong>Total: ₹{order.totalAmount}</strong>

            <select
              value={order.status}
              onChange={e =>
                updateStatus(order._id, e.target.value)
              }
            >
              <option value="Placed">Placed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

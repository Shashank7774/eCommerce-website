import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/orders/details/${id}`)
      .then(res => setOrder(res.data));
  }, []);

  if (!order) return <p>Loading...</p>;

  return (
    <div style={{ padding: 30 }}>
      <h2>Order Details</h2>
      <p>Status: {order.status}</p>
      <p>Total: ₹{order.totalAmount}</p>

      <h3>Products</h3>
      {order.products.map((p, i) => (
        <p key={i}>
          {p.name} × {p.qty} = ₹{p.price * p.qty}
        </p>
      ))}
    </div>
  );
}
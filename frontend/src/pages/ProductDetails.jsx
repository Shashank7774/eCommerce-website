import axios from "axios";
import { useEffect, useState, useContext } from "react";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Toast from "../components/Toast";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(""); // ✅ FIX
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");


  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => {
        const p = res.data.find(x => x._id === id);
        setProduct(p);

        // ✅ IMPORTANT: check images exist
        if (p && p.images && p.images.length > 0) {
          setMainImage(p.images[0]);
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  const handleAdd = () => {
    addToCart(product, qty);
    setMessage("✅ Product added to cart");
    setTimeout(() => setMessage(""), 2000);
  };
  const submitReview = async () => {
  await axios.post(
    `http://localhost:5000/api/products/review/${product._id}`,
    {
      user: "Anonymous",
      rating,
      comment
    }
  );

  alert("Review added");
  setComment("");
};

  return (
  <div className="product-page">
    <Toast message={message} />

    <div className="product-container">
      {/* IMAGE SECTION */}
      <div className="image-section">
        <img
          src={mainImage}
          alt="product"
          className="main-image"
        />

        <div className="thumbnail-row">
          {product.images?.map((img, i) => (
            <img
              key={i}
              src={img}
              className="thumbnail"
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      {/* PRODUCT INFO */}
      <div className="info-section">
        <h1>{product.name}</h1>
        <h2 className="price">₹{product.price}</h2>
        <p className="product-description">{product.description}</p>


        <span
          className={`stock ${
            product.stock > 0 ? "in" : "out"
          }`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>

        {/* QUANTITY */}
        <div className="qty-box">
          <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
          <span>{qty}</span>
          <button onClick={() => setQty(qty + 1)}>+</button>
        </div>

        {/* ADD TO CART */}
        {product.stock > 0 && (
          <button className="add-cart-btn" onClick={handleAdd}>
            Add to Cart
          </button>
        )}

        {/* REVIEWS */}
        <div className="reviews-section">
          <h3>Customer Reviews</h3>

          {product.reviews?.map((r, i) => (
            <div key={i} className="review-card">
              <strong>⭐ {r.rating}/5</strong>
              <p>{r.comment}</p>
            </div>
          ))}

          <h4>Add Review</h4>

          <select onChange={e => setRating(e.target.value)}>
            <option value="5">★★★★★</option>
            <option value="4">★★★★</option>
            <option value="3">★★★</option>
            <option value="2">★★</option>
            <option value="1">★</option>
          </select>

          <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={e => setComment(e.target.value)}
          />

          <button className="review-btn" onClick={submitReview}>
            Submit Review
          </button>
        </div>
      </div>
    </div>
  </div>
);

}
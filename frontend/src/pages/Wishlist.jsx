import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  return (
    <div className="wishlist-page">
      <h2>Your Wishlist ❤️</h2>

      {wishlist.length === 0 && (
        <p className="empty">No items in wishlist</p>
      )}

      <div className="wishlist-grid">
        {wishlist.map(p => (
          <div
            key={p._id}
            className="wishlist-card"
            onClick={() => navigate(`/product/${p._id}`)}
          >
            <img src={p.images?.[0]} alt={p.name} />
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(p);
              }}
            >
              Remove ❤️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

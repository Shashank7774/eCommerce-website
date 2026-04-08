import axios from "axios";
import { useEffect, useState, useContext } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [shrinkHero, setShrinkHero] = useState(false);

  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist } = useContext(WishlistContext);

  /* FETCH PRODUCTS */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  /* STICKY HERO */
  useEffect(() => {
    const onScroll = () => setShrinkHero(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* INFINITE SCROLL */
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setVisibleCount(prev => prev + 6);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* SCROLL TO TOP */
  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featured = products.slice(0, 5);

  const filteredProducts = category
    ? products.filter(p => p.category === category)
    : products;

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="home-page">

      {/* HERO */}
      <div className={`hero ${shrinkHero ? "hero-sticky" : ""}`}>
        <h1>Discover Your Style</h1>
        <p>Trendy fashion for Men, Women & Kids</p>
      </div>

      <SearchBar onSearch={setProducts} />

      {/* FEATURED */}
      <h2 className="section-title">✨ Featured Products</h2>

      <div className="featured-slider">
        {featured.map(p => (
          <div
            key={p._id}
            className="featured-card"
            onClick={() => navigate(`/product/${p._id}`)}
          >
            <div className="featured-card">
  <img src={p.images?.[0]} />
  <div className="featured-info">
    <p>{p.name}</p>
    <span>₹{p.price}</span>
  </div>
</div>

          </div>
        ))}
      </div>

      {/* CATEGORY */}
      <div className="category-bar">
        <button onClick={() => setCategory("")}>All</button>
        <button onClick={() => setCategory("men")}>Men</button>
        <button onClick={() => setCategory("women")}>Women</button>
        <button onClick={() => setCategory("kids")}>Kids</button>
      </div>

      {/* PRODUCTS */}
      <div className="product-grid">
        {loading &&
          Array.from({ length: 8 }).map((_, i) => (
            <div className="product-skeleton" key={i}></div>
          ))
        }

        {!loading && visibleProducts.map(p => (
          <div
            className="product-card"
            key={p._id}
            onClick={() => navigate(`/product/${p._id}`)}
          >
            <img src={p.images?.[0]} alt={p.name} />

            <div className="card-body">
              <h4 className="product-name">{p.name}</h4>
              <p className="product-description">{p.description}</p>
              <p className="price">₹{p.price}</p>

              <span className={`stock ${p.stock > 0 ? "in" : "out"}`}>
                {p.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>

              <button
                className="wishlist-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(p);
                }}
              >
                ❤️
              </button>
            </div>

            <button
              className="add-cart-btn"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(p, 1);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* SCROLL TO TOP */}
      {showTopBtn && (
        <button
          className="scroll-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      )}

    </div>
  );
}

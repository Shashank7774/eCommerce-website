import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import ThemeToggle from "./ThemeToggle";
import "./navbar.css";


export default function Navbar() {
  const {cart} = useContext(CartContext);
  const totalItems = cart.reduce((sum , p ) => sum + p.qty, 0);
  const navigate = useNavigate();

  // 🔹 Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{
      background: "#131921",
      padding: "15px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "white"
    }}>
      {/* LOGO */}
      <Link to="/" style={{ color: "#febd69", fontSize: 22 }}>
        <div className="logo">
          <img src="/logo.jpeg" alt="FashionZone" /><span>
            FashionZone
          </span>
        </div>
      </Link>

      {/* RIGHT SIDE */}
      <ThemeToggle />
      <div style={{ display: "flex", gap: 20 }}>
        <Link to="/" style={{color: "white"}}>Home</Link>
        <Link to="/wishlist">❤️ Wishlist</Link>

        <Link to="/cart" style={{ color: "white", position:"relative"}}>🛒Cart {totalItems > 0 && (<span style={{position:"absolute", top:"-2", right:'-6', background:'brown', color:'white', borderRadius:"100px",padding:'1px 3px', fontSize:'6'}}>{totalItems}</span>)}</Link>
        <Link to="/orders">Orders</Link>

        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Signup</Link>
          </>
        )}
      </div>
      <Link to="/admin" style={{ color: "white"}}>Admin</Link>
    </div>
  );
}

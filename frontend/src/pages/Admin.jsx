import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

export default function Admin() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // STATES
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // ADD PRODUCT STATES
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [images, setImages] = useState([]);

  const [stats, setStats] = useState(null);
  const fetchStats = async () => {
  const res = await axios.get("http://localhost:5000/api/admin/stats");
  setStats(res.data);
};


  useEffect(() => {
    if (!user || !user.isAdmin) {
      alert("Admin Access Only")
      navigate("/");
      return;
    }
    fetchProducts();
    fetchStats();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  /* ADD PRODUCT */
  const addProduct = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    formData.append("description", description);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    await axios.post(
      "http://localhost:5000/api/products/add",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    alert("Product added");
    setName(""); setPrice(""); setStock(""); setCategory(""); setDescription(""); setImages([]);
    fetchProducts();
  };

  /* DELETE PRODUCT */
  const deleteProduct = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/products/delete/${id}`
    );
    setProducts(products.filter(p => p._id !== id));
  };

  /* SEARCH + FILTER */
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterCategory === "" || p.category === filterCategory)
  );

  return (
  <div className="admin-page">
    <h2 className="admin-title">🛠 Admin Dashboard</h2>
    {stats && (
  <div className="analytics-grid">
    <div className="analytics-card">
      <h3>Total Orders</h3>
      <p>{stats.totalOrders}</p>
    </div>

    <div className="analytics-card">
      <h3>Total Revenue</h3>
      <p>₹{stats.totalRevenue}</p>
    </div>

    <div className="analytics-card">
      <h3>Total Users</h3>
      <p>{stats.totalUsers}</p>
    </div>

    <div className="analytics-card">
      <h3>Total Products</h3>
      <p>{stats.totalProducts}</p>
    </div>
  </div>
)}


    {/* ADD PRODUCT */}
    <div className="admin-card">
      <h3>Add Product</h3>

      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Price" onChange={e => setPrice(e.target.value)} />
      <input placeholder="Stock" onChange={e => setStock(e.target.value)} />

      <select onChange={e => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="men">Men</option>
        <option value="women">Women</option>
        <option value="kids">Kids</option>
      </select>
      <textarea
        placeholder="Product Description"
        rows="4"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />


      <input
        type="file"
        multiple
        onChange={e => setImages(e.target.files)}
      />

      <button className="admin-btn" onClick={addProduct}>
        Add Product
      </button>
    </div>

    {/* SEARCH & FILTER */}
    <div className="admin-card admin-search">
      <input
        placeholder="Search product"
        onChange={e => setSearch(e.target.value)}
      />

      <select onChange={e => setFilterCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="men">Men</option>
        <option value="women">Women</option>
        <option value="kids">Kids</option>
      </select>
    </div>
    <button
  className="admin-btn"
  onClick={() => navigate("/admin/orders")}
>
  View Orders
</button>


    {/* PRODUCT LIST */}
    <h3>All Products</h3>

    {filteredProducts.map(p => (
      <div className="product-card" key={p._id}>
        <img
          src={
            p.images && p.images.length > 0
              ? p.images[0]
              : "https://via.placeholder.com/80"
          }
          width="80"
        />

        <div className="product-info">
          <p><b>{p.name}</b></p>
          <p>₹{p.price}</p>
          <p>Stock: {p.stock}</p>
          <p>Category: {p.category}</p>
          <p>Description: {p.description}</p>
        </div>

        <button
          className="delete-btn"
          onClick={() => deleteProduct(p._id)}
        >
          Delete
        </button>
      </div>
    ))}
  </div>
);

}

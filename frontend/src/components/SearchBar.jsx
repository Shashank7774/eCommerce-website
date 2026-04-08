import { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onFilter }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  <SearchBar onSearch = {setSearch}/>;

  const applyFilters = () => {
    onFilter({
      search,
      category,
      minPrice,
      maxPrice
    });
  };

  return (
    <div className="filter-bar">
      <input
        placeholder="Search products..."
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          applyFilters();
        }}
      />

      <select
        value={category}
        onChange={e => {
          setCategory(e.target.value);
          applyFilters();
        }}
      >
        <option value="">All Categories</option>
        <option value="men">Men</option>
        <option value="women">Women</option>
        <option value="kids">Kids</option>
      </select>

      <input
        type="number"
        placeholder="Min ₹"
        value={minPrice}
        onChange={e => {
          setMinPrice(e.target.value);
          applyFilters();
        }}
      />

      <input
        type="number"
        placeholder="Max ₹"
        value={maxPrice}
        onChange={e => {
          setMaxPrice(e.target.value);
          applyFilters();
        }}
      />
    </div>
  );
}

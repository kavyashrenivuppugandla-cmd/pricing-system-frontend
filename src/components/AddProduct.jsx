import React, { useState } from "react";
import axios from "axios";  
import { useNavigate } from "react-router-dom"; 
function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    basePrice: "",
    inventory: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const submitProduct = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/products")
    .then(res => res.json())
    .then(data => {
      const exists = data.some(p => p.name.toLowerCase() === product.name.toLowerCase());
      if (exists) {
        alert("Product already exists!");
      } else {
        axios.post("http://localhost:8080/products", product)  
      .then(() => {
        alert("Product Added");
        navigate("/products");
        setProduct({ name: "", basePrice: "", inventory: "" });
         
      })
      .catch(err => {
        alert("Failed to add product");
        console.error(err);
      });
      }
    });


  };

  return (
    <div className="add-product-container">
      <div className="add-product-card">
        <h2 className="add-product-header">📦 Add New Product</h2>
        <p className="add-product-subtitle">Enter the details below to add a product to your inventory.</p>
        <form onSubmit={submitProduct}>
          <div className="form-group">
            <label className="modern-label">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              placeholder="e.g., Wireless Headphones"
              className="modern-input"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="modern-label">Base Price (₹)</label>
            <input
              type="number"
              name="basePrice"
              value={product.basePrice}
              placeholder="e.g., 99.99"
              className="modern-input"
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <div className="form-group">
            <label className="modern-label">Initial Inventory</label>
            <input
              type="number"
              name="inventory"
              value={product.inventory}
              placeholder="e.g., 50"
              className="modern-input"
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <button className="modern-btn" type="submit">
            Add Product To System
          </button>
        </form>
      </div>

    <div className="container mt-4">
      <h2>Add Product</h2>
      <form onSubmit={submitProduct}>
        <input
          type="text"
          name="name"
          value={product.name}
          placeholder="Product Name"
          className="form-control mb-2"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="basePrice"
          value={product.basePrice}
          placeholder="Base Price"
          className="form-control mb-2"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="inventory"
          value={product.inventory}
          placeholder="Inventory"
          className="form-control mb-2"
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary" type="submit">
          Add Product
        </button>
      </form>

    </div>
  );
}

export default AddProduct;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("Not authorized");
      return;
    }

    const res = await fetch("http://localhost:3001/product/admin/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        price: Number(price),
        stock: Number(stock),
        image,
      }),
    });

    const data = await res.json();
    console.log("Product Created:", data);

    if (res.ok) {
      alert("Product created successfully!");
      navigate("/admin/products");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Product</h1>

      <form onSubmit={submitHandler} style={{ maxWidth: "400px" }}>
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
          required
        />

        <label>Price</label>
        <input
          value={price}
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
          required
        />

        <label>Stock</label>
        <input
          value={stock}
          type="number"
          onChange={(e) => setStock(e.target.value)}
          style={inputStyle}
          required
        />

        <label>Image URL</label>
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={inputStyle}
          required
        />

        <button type="submit" style={submitBtn}>
          ➕ Create Product
        </button>
      </form>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const submitBtn: React.CSSProperties = {
  padding: "10px 15px",
  background: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  width: "100%",
};

export default CreateProduct;

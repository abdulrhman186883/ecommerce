import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  title: string;
  price: number;
  stock: number;
  image: string;
}

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<Product | null>(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://localhost:3001/product/${id}`)
      .then((res) => res.json())
      .then((data: Product) => setForm(data));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form || !token) {
      alert("Unauthorized or missing form");
      return;
    }

    await fetch(`https://ecommerce-2j15.onrender.com/product/admin/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    alert("Product updated!");
    navigate("/admin/products");
  };

  if (!form) return <p>Loading product...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Product</h1>

      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
        />

        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
        />

        <button type="submit" style={buttonStyle}>Save</button>
      </form>
    </div>
  );
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  maxWidth: "300px",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px",
  background: "#2196f3",
  color: "white",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
};

export default EditProduct;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  title: string;
  price: number;
  stock: number;
  image: string;
}

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const token = localStorage.getItem("token");

  // Fetch all products on mount
  useEffect(() => {
    fetch("https://ecommerce-2j15.onrender.com/product")
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Delete product
  const deleteProduct = async (id: string) => {
    if (!token) {
      alert("You are not authorized");
      return;
    }

    await fetch(`https://ecommerce-2j15.onrender.com/product/admin/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Remove from state
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manage Products</h1>

      <Link to="/admin/products/create" style={createBtn}>
        ➕ Create New Product
      </Link>

      <div style={{ marginTop: "20px" }}>
        {products.map((p) => (
          <div key={p._id} style={cardStyle}>
            <h3>{p.title}</h3>
            <p>💲 Price: {p.price}</p>
            <p>📦 Stock: {p.stock}</p>

            {p.image && (
              <img
                src={p.image}
                alt={p.title}
                style={{ width: "120px", borderRadius: "5px" }}
              />
            )}

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <Link to={`/admin/products/edit/${p._id}`} style={editBtn}>
                ✏️ Edit
              </Link>

              <button
                onClick={() => deleteProduct(p._id)}
                style={deleteBtn}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------- Styles ----------
const createBtn: React.CSSProperties = {
  padding: "10px 15px",
  display: "inline-block",
  background: "#4CAF50",
  color: "white",
  borderRadius: "6px",
  textDecoration: "none",
  marginBottom: "20px",
};

const cardStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "15px",
  borderRadius: "8px",
  marginBottom: "15px",
  background: "#fafafa",
};

const editBtn: React.CSSProperties = {
  padding: "8px 14px",
  background: "#2196F3",
  color: "white",
  borderRadius: "5px",
  textDecoration: "none",
};

const deleteBtn: React.CSSProperties = {
  padding: "8px 14px",
  background: "#E53935",
  color: "white",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
};

export default ProductsList;

import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "20px",
          maxWidth: "300px"
        }}
      >
        <Link to="/admin/products" style={linkStyle}>
          📦 Manage Products
        </Link>

        <Link to="/admin/products/create" style={linkStyle}>
          ➕ Create New Product
        </Link>

        <Link to="/" style={linkStyle}>
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
};

const linkStyle: React.CSSProperties = {
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  textDecoration: "none",
  color: "black",
  background: "#f9f9f9",
  display: "block",
  fontSize: "16px"
};

export default AdminDashboard;

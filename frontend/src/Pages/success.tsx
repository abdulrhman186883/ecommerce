import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useCart } from "../context/Cart/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/Auth/Authcontext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const CheckoutPage = () => {
  const { cartItems, totalAmount } = useCart();
  const navigate = useNavigate();
  const { token } = useAuth();   // ✅ FIXED: hook inside component

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  const handlePlaceOrder = async () => {
    if (address.trim().length < 5) {
      setAddressError("Please enter a valid address.");
      return;
    }

    setAddressError("");

    try {
      const response = await fetch("http://localhost:3001/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address,
          items: cartItems,
          total: totalAmount,
        }),
      });

      const data = await response.json();
      console.log("Checkout Response:", data);

      if (!response.ok) {
        console.error("Checkout failed:", data);
        return;
      }

      // ✅ allow success page
      sessionStorage.setItem("checkoutSuccess", "true");

      navigate("/success");
      
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
      <Container
      sx={{
        mt: 10,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CheckCircleIcon
        sx={{
          fontSize: 120,
          color: "green",
          mb: 2,
          animation: "pop 0.4s ease-out",
        }}
      />

      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
        Order Successful! 🎉
      </Typography>

      <Typography variant="body1" sx={{ maxWidth: 500, mb: 4 }}>
        Thank you! Your order has been received and is now being processed.
      </Typography>

      <Box display="flex" gap={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          sx={{ px: 4 }}
        >
          Continue Shopping
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/orders")}
          sx={{ px: 4 }}
        >
          View Orders
        </Button>
      </Box>

      <style>
        {`
          @keyframes pop {
            0% { transform: scale(0.5); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </Container>
  );
};

export default CheckoutPage;

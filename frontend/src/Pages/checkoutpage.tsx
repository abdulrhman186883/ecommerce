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

const CheckoutPage = () => {
  const { cartItems, totalAmount } = useCart();
  const navigate = useNavigate();
  const {token} = useAuth()

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  const handlePlaceOrder = async () => {
    if (address.trim().length < 5) {
      setAddressError("Please enter a valid address.");
      return;
    }

    setAddressError("");

    try {
      const response = await fetch('http://ecommerce-2j15.onrender.com/cart/checkout', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
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
        console.error("❌ Checkout failed:", data);
        return;
      }

      console.log("✅ Order placed successfully!");
      console.log("Order Details Sent:", {
        address,
        cartItems,
        totalAmount,
      });

      navigate('/success')
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" fontWeight="bold">
        Checkout
      </Typography>

      {/* CART SUMMARY */}
      <Box mt={4}>
        <Typography variant="h6" fontWeight={600}>
          Order Summary
        </Typography>

        {cartItems.map((item) => (
          <Box
            key={item.productId}
            display="flex"
            justifyContent="space-between"
            p={1}
            mt={2}
            sx={{
              borderBottom: "1px solid #ddd",
            }}
          >
            <Typography>{item.title}</Typography>
            <Typography>
              {item.quantity} × {item.unitPrice} EUR
            </Typography>
          </Box>
        ))}

        <Box display="flex" justifyContent="space-between" mt={2} p={1}>
          <Typography variant="h6" fontWeight={600}>
            Total:
          </Typography>
          <Typography variant="h6" fontWeight={600}>
            {totalAmount} EUR
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* SHIPPING ADDRESS FORM */}
      <Box>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Shipping Address
        </Typography>

        <TextField
          fullWidth
          label="Full Address"
          placeholder="Street 123, City, Country"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          error={!!addressError}
          helperText={addressError}
          sx={{ mb: 3 }}
        />
      </Box>

      {/* BUTTONS */}
      <Box mt={3} display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/cart")}
          sx={{ px: 4 }}
        >
          Back to Cart
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handlePlaceOrder}
          sx={{ px: 4 }}
        >
          Place Order
        </Button>
      </Box>
    </Container>
  );
};

export default CheckoutPage;

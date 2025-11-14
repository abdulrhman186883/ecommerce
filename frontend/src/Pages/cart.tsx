import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth/Authcontext";
import { useCart } from "../context/Cart/CartContext";
import Box from "@mui/material/Box";

const CartPage = () => {
  const { token } = useAuth();
  const {cartItems, totalAmount} = useCart()
  const [cart, setCart] = useState(null);
  const [error, setError] = useState("");

 

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
      {error && <Typography color="error">{error}</Typography>}
      {cartItems.map((item)=> (
        <Box> {item.title}</Box>
      )
      )}
    </Container>
  );
};

export default CartPage;

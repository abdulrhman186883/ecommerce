import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth/Authcontext";

const CartPage = () => {
  const { token } = useAuth();
  const [cart, setCart] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:3001/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setError("Failed to fetch user cart.");
          return;
        }

        const data = await response.json();
        setCart(data);
      } catch (err) {
        setError("Server error.");
      }
    };

    if (token) fetchCart();
  }, [token]); 
 
  console.log({ cart });

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
};

export default CartPage;

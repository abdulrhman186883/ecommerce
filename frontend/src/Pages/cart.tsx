import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth/Authcontext";
import { useCart } from "../context/Cart/CartContext";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const { token } = useAuth();
  const {cartItems, totalAmount , updateIteminCart , RemoveItemInCart, clearCart} = useCart()
  const [cart, setCart] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

 const handleQuantity = (productId: string, quantity: number) => {
 if (quantity <= 0){
  return
 }

 

 updateIteminCart(productId, quantity)
 }



 const handleRemoveItem  = (productId: string) => {
  RemoveItemInCart(productId);
 }

 

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
      {error && <Typography color="error">{error}</Typography>}
      {cartItems.map((item)=> (
        <Box
  key={item.productId}      
  display="flex"
  alignItems="center"
  justifyContent="space-between"
  mt={3}             
  p={2}
  sx={{
    borderRadius: 2,
    border: "1px solid #e0e0e0",
    boxShadow: 1,
    backgroundColor: "#fff",
  }}
>

  {/* Product Image */}
  <Box flex="0 0 130px" mx={2}>   
    <img
      src={item.image}
      width="100%"
      style={{
        borderRadius: 8,
        objectFit: "contain",
      }}
    />
  </Box>

  {/* Product Details */}
  <Box flex="1" mx={2}>         
    <Typography variant="h6" sx={{ fontWeight: 600 }}>
      {item.title}
    </Typography>

    <Typography variant="body1" sx={{ color: "text.secondary", mt: 1 }}>
      {item.quantity} × {item.unitPrice} EUR
    </Typography>
  </Box>

  {/* Quantity Controls */}
  <Box mx={2}>                  
    <ButtonGroup variant="contained" size="small">
      <Button onClick={() => handleQuantity(item.productId, item.quantity +1 )}>+</Button>
      <Button onClick={() => handleQuantity(item.productId, item.quantity -1 )}>-</Button>
    </ButtonGroup>
  </Box>
 <Box mx={2}>
  <Button
    color="error"
    variant="outlined"
    onClick={() => handleRemoveItem(item.productId)}
    sx={{ minWidth: 40 }}
  >
    🗑️
  </Button>
</Box>
</Box>


      )
      )}

      {/* TOTAL AMOUNT SECTION */}
  <Box
    mt={4}
    p={2}
    display="flex"
    justifyContent="flex-end"
  >
    <Typography variant="h5" fontWeight={600}>
      Total Amount: {totalAmount} EUR
    </Typography>
  </Box>


 {/* ACTION BUTTONS */}
<Box mt={3} display="flex" justifyContent="center" gap={2}>
  {cartItems.length === 0 ? (
    // EMPTY CART → only show Go Shopping
    <Button
      color="primary"
      variant="contained"
      onClick={() => window.location.href = "/"}
      sx={{ px: 4, py: 1.2, fontSize: "1rem" }}
    >
      Go Shopping 🛍️
    </Button>
  ) : (
    <>
      {/* Go to Checkout */}
      <Button
        color="primary"
        variant="contained"
         onClick={() => navigate("/checkout")}
        sx={{ px: 4, py: 1.2, fontSize: "1rem" }}
      >
        Go to Checkout 🛒
      </Button>

      {/* Clear Cart */}
      <Button
        color="error"
        variant="outlined"
        onClick={() => clearCart()}
        sx={{ px: 4, py: 1.2, fontSize: "1rem" }}
      >
        Clear Cart
      </Button>
    </>
  )}
</Box>
    </Container>
  );
};

export default CartPage;

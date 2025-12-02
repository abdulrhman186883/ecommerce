import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { useAuth } from "../context/Auth/Authcontext";

interface OrderItem {
  productTitle: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
}

interface Order {
  _id: string;
  orderItems: OrderItem[];
  total: number;
  address: string;
  createdAt: string;
}

const OrdersPage = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://ecommerce-2j15.onrender.com/user/myorders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to fetch orders");
          setLoading(false);
          return;
        }

        // Backend returns array directly → no "orders" field
        setOrders(data || []);
        setLoading(false);
      } catch (err) {
        setError("Server error");
        setLoading(false);
      }
    };

    if (token) fetchOrders();
  }, [token]);


  // LOADING STATE
  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5">Loading your orders...</Typography>
      </Container>
    );
  }

  // EMPTY STATE
  if (orders.length === 0) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold">
          You have no orders yet.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Start shopping and your orders will appear here.
        </Typography>
      </Container>
    );
  }


  // SUCCESS — RENDER ORDERS
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        My Orders
      </Typography>

      {orders.map((order) => (
        <Paper key={order._id} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Order #{order._id}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Placed on: {new Date(order.createdAt).toLocaleString()}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {order.orderItems.map((item, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <img
                  src={item.productImage}
                  width={70}
                  style={{ borderRadius: 6 }}
                />
                <Typography>{item.productTitle}</Typography>
              </Box>

              <Typography>
                {item.quantity} × {item.unitPrice} EUR
              </Typography>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" fontWeight="bold">
            Total: {order.total} EUR
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Shipping to: <b>{order.address}</b>
          </Typography>
        </Paper>
      ))}
    </Container>
  );
};

export default OrdersPage;

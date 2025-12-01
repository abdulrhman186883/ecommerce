import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useAuth } from '../context/Auth/Authcontext';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useCart } from '../context/Cart/CartContext';

function Navbar() {
  const { username, isAuthenticated, logout, role } = useAuth();
  const { cartItems } = useCart();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => navigate('/login');
  const handleLogout = () => {
    logout();
    navigate('/');
    handleCloseUserMenu();
  };

  const handleMyOrders = () => {
    navigate('/myorder');
    handleCloseUserMenu();
  };

  const handleCart = () => navigate('/cart');

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* LOGO */}
          <Button variant="text" sx={{ color: "#ffffff" }} onClick={() => navigate('/')}>
            <AdbIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
              }}
            >
              Laptops Store
            </Typography>
          </Button>

          {/* PUSH CONTENT TO THE RIGHT */}
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center" }} gap={3}>

            {/* CART BUTTON */}
            <IconButton onClick={handleCart}>
              <Badge badgeContent={cartItems.length} color="secondary">
                <ShoppingCartIcon sx={{ color: '#ffffff' }} />
              </Badge>
            </IconButton>

            {/* ⭐ ADMIN BUTTON ONLY IF ROLE=ADMIN ⭐ */}
            {role === "admin" && (
              <Button
                variant="contained"
                color="warning"
                onClick={() => navigate('/admin')}
              >
                Admin Panel
              </Button>
            )}

            {/* USER MENU */}
            {isAuthenticated ? (
              <>
                <Tooltip title="Open settings">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography sx={{ color: "white", fontWeight: 500 }}>
                    {username}
                  </Typography>

                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={username || ""} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Box>
              </Tooltip>

                {/* DROPDOWN MENU */}
                <Menu
                  sx={{ mt: "45px" }}
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleMyOrders}>
                    <Typography>My Orders</Typography>
                  </MenuItem>

                  {/* ⭐ ADMIN DROPDOWN OPTION ⭐ */}
                  {role === "admin" && (
                    <MenuItem onClick={() => { navigate("/admin"); handleCloseUserMenu(); }}>
                      <Typography>Admin Panel</Typography>
                    </MenuItem>
                  )}

                  <MenuItem onClick={handleLogout}>
                    <Typography>Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button variant="contained" color="success" onClick={handleLogin}>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

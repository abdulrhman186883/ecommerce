import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
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

function Navbar() {
  const {username, isAuthenticated, logout} = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
const navigate = useNavigate();
const handlelogin = () => {
  navigate('/login');

}

const handlelogout = () => {
  logout()
  navigate('/')
  handleCloseUserMenu()
}

const handlecart = () => [
navigate('/cart')
]
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <AdbIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#home"
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          {/* Filler space to push avatar to right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Avatar & User Menu */}
          <Box sx={{ display: "flex" , flexDirection: "row" , flexGrow: 0 }} gap={4} alignItems={'center'}>
           <IconButton aria-label="cart" onClick={handlecart}>
            <Badge badgeContent={4} color="secondary" overlap="rectangular">
              <ShoppingCartIcon sx={{color: '#ffffff'}}/>
            </Badge>
          </IconButton>


            {isAuthenticated ? 
            <>
             <Tooltip title="Open settings">
              <Grid container alignItems="center" justifyContent="flex-end" spacing={1}>
              <Grid>
                <Typography sx={{ color: "white", fontWeight: 500 }}>
                  {username}
                </Typography>
              </Grid>

              <Grid>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={username || ""} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Grid>
            </Grid>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>My orders</Typography>
                  </MenuItem>
                  <MenuItem  onClick={handlelogout}>
                  <Typography sx={{ textAlign: 'center' }}> Logout </Typography>
                </MenuItem>
             
            </Menu>
            </> : <Button variant='contained' color="success" onClick={handlelogin}> login</Button>}
           
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

import { AppBar, Toolbar, Typography, Button, Box, IconButton, Badge, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import useCartStore from '../store/cartStore';

function Layout({ children, toggleTheme }) {
  const theme = useTheme();
  const cartItems = useCartStore((state) => state.items);
  const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#2196f3'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Каталог товаров
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              sx={{ ml: 1 }}
              onClick={toggleTheme}
              color="inherit"
            >
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            <Button
              color="inherit"
              component={RouterLink}
              to="/"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Главная
            </Button>

            <Button
              color="inherit"
              component={RouterLink}
              to="/cart"
              startIcon={
                <Badge badgeContent={itemsCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              }
            >
              <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                Корзина
              </Typography>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 8, sm: 9 },
          px: { xs: 1, sm: 2, md: 3 },
          backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#f5f5f5',
          minHeight: '100vh',
          width: '100vw'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Layout;

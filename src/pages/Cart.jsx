import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  TextField,
  IconButton,
  Divider,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link as RouterLink } from 'react-router-dom';
import useCartStore from '../store/cartStore';

function Cart() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (items.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <ShoppingCartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Корзина пуста
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
          Добавьте товары из каталога
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="/"
          size={isMobile ? "medium" : "large"}
        >
          Перейти в каталог
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          textAlign: 'left',
          mb: 4,
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
        }}
      >
        Корзина
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: { xs: 1, sm: 2 } }}>
            {items.map((item) => (
              <Card 
                key={item.id} 
                sx={{ 
                  mb: 2,
                  backgroundColor: theme.palette.background.paper,
                  '&:last-child': { mb: 0 }
                }}
              >
                <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4} sm={3}>
                      <CardMedia
                        component="img"
                        image={item.image}
                        alt={item.title}
                        sx={{
                          objectFit: 'contain',
                          height: { xs: 80, sm: 100, md: 120 },
                          borderRadius: 1,
                          backgroundColor: theme.palette.background.default,
                          p: 1
                        }}
                      />
                    </Grid>
                    <Grid item xs={8} sm={9}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Typography 
                          variant="h6" 
                          gutterBottom
                          sx={{
                            fontSize: { xs: '0.9rem', sm: '1.1rem' },
                            fontWeight: 500,
                            mb: 1
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          color="primary" 
                          sx={{ 
                            fontWeight: 500,
                            fontSize: { xs: '1rem', sm: '1.25rem' },
                            mb: 1
                          }}
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 'auto' }}>
                          <TextField
                            type="number"
                            size="small"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))
                            }
                            inputProps={{ min: 1 }}
                            sx={{ width: { xs: 60, sm: 80 } }}
                          />
                          <IconButton
                            color="error"
                            onClick={() => removeItem(item.id)}
                            size={isMobile ? "small" : "medium"}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: { xs: 2, sm: 3 },
              position: { md: 'sticky' },
              top: { md: '100px' }
            }}
          >
            <Typography variant="h5" gutterBottom>
              Итого
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 3 }}>
              <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body1">Товары ({items.length}):</Typography>
                <Typography variant="body1">${getTotal().toFixed(2)}</Typography>
              </Grid>
            </Box>
            <Typography variant="h4" color="primary" gutterBottom>
              ${getTotal().toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              fullWidth
              size={isMobile ? "medium" : "large"}
              sx={{ mt: 2 }}
              onClick={() => {
                alert('Заказ оформлен!');
              }}
            >
              Оформить заказ
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Cart; 
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Box,
} from '@mui/material';
import { ShoppingCart, CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { items, addItem } = useCartStore();
  const isInCart = items.some((item) => item.id === product.id);
  const cartItem = items.find((item) => item.id === product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
        }
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        sx={{ 
          objectFit: 'contain', 
          p: 2,
          height: { xs: 150, sm: 200 }
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="h2"
          sx={{
            fontSize: { xs: '1rem', sm: '1.25rem' },
            lineHeight: 1.2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          gutterBottom
          sx={{
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
          }}
        >
          {product.category}
        </Typography>
        <Typography 
          variant="h6" 
          color="primary"
          sx={{
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          ${product.price}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant={isInCart ? "outlined" : "contained"}
          startIcon={isInCart ? <CheckCircle /> : <ShoppingCart />}
          onClick={handleAddToCart}
          color={isInCart ? "success" : "primary"}
          sx={{
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
          }}
        >
          {isInCart ? `В корзине (${cartItem.quantity})` : "В корзину"}
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard; 
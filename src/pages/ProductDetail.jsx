import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Container,
  Paper,
} from '@mui/material';
import { ShoppingCart, CheckCircle } from '@mui/icons-material';
import useCartStore from '../store/cartStore';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { items, addItem } = useCartStore();
  const isInCart = items.some((item) => item.id === Number(id));
  const cartItem = items.find((item) => item.id === Number(id));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5">Товар не найден</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                sx={{
                  objectFit: 'contain',
                  height: { xs: 300, md: 400 },
                  p: 2,
                }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.title}
              </Typography>
              <Typography variant="h5" color="primary">
                ${product.price}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Категория: {product.category}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {product.description}
              </Typography>
              <Button
                variant={isInCart ? "outlined" : "contained"}
                size="large"
                startIcon={isInCart ? <CheckCircle /> : <ShoppingCart />}
                onClick={() => addItem(product)}
                color={isInCart ? "success" : "primary"}
                sx={{ mt: 2 }}
              >
                {isInCart ? `В корзине (${cartItem.quantity})` : "В корзину"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ProductDetail; 
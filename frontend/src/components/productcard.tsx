import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useCart } from '../context/Cart/CartContext'
interface Props {
  _id: string;
  title: string;
  image: string;
  price: string | number;
}

export default function ProductCard({ _id, title, image, price }: Props) {
  const {addItemToCart} = useCart();
  console.log("ProductCard props:", { _id, title, price });




  return (
    <Card sx={{ maxWidth: 345, width: '100%', boxShadow: 2, borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="180"
        image={image}  
        alt={title}
        sx={{ objectFit: 'contain', p: 1 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          ${price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" onClick={() => addItemToCart(_id)}>
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
}

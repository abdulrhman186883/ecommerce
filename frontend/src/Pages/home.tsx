import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ProductCard from "../components/productcard";
import { useEffect, useState } from 'react';
import { Product } from '../types/Product';
function HomePage() {
const [products, setProducts] = useState<Product[]>([])


useEffect(() =>{
    fetch("https://ecommerce-2j15.onrender.com/product").then(async (response)=>{
        const data = await response.json();
        console.log(data);
        setProducts(data);
    })
},[])
  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        { products.map(({_id, title, image , price}) => (
         <Grid key={_id} size={{ md: 4 }}>
          <ProductCard _id={_id} title={title} image={image} price={price} />
        </Grid>))}
        
        
      </Grid>
    </Container>
  );
}

export default HomePage;

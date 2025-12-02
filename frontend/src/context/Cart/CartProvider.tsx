import { FC, PropsWithChildren, useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "../../types/CartItem";
import { useAuth } from "../Auth/Authcontext";



const CartProvider: FC<PropsWithChildren> = ({children}) => {
const {token} = useAuth()
const [cartItems, setCartItems] = useState<CartItem[]>([]);
const [totalAmount, setTotalAmout] = useState<number>(0);
const [error, setError] = useState('');

 useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("https://ecommerce-2j15.onrender.com/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setError("Failed to fetch user cart.");
          return;
        }

        const cart = await response.json();
        const cartItemsMapped = cart.items.map(({product ,quantity , unitPrice} : any) => 
            ({productId: product._id, title: product.title, image: product.image, quantity, unitPrice: unitPrice}))
        setCartItems([...cartItemsMapped])
        setTotalAmout(cart.totalAmount)
        setCartItems(cartItemsMapped);
      } catch (err) {
        setError("Server error.");
      }
    };

    if (token) fetchCart();
  }, [token]); 
 

const addItemToCart = async (productId: string) => {
    try{
    const response = await fetch("https://ecommerce-2j15.onrender.com/cart/items", {
         
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            productId,
            quantity: 1
            
        })
        });
        if(!response.ok){
        setError('Failed to add to cart');
        }


        const cart = await response.json();
        if(!cart){
            setError("failed to parse cart data")
        }

        const cartItemsMapped = cart.items.map(({product ,quantity} : any) => 
            ({productId: product._id, title: product.title, image: product.image, quantity, unitPrice: product.unitPrice}))
        setCartItems([...cartItemsMapped])
        setTotalAmout(cart.totalAmount)

    } catch (error) {
        console.error(error)

    }
}

const updateIteminCart  = async (productId: string, quantity: number) => {
try{
    const response = await fetch("https://ecommerce-2j15.onrender.com/cart/items", {
         
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            productId,
            quantity,
            
        })
        });
        if(!response.ok){
        setError('Failed to update to cart');
        }


        const cart = await response.json();
        if(!cart){
            setError("failed to parse cart data")
        }

        const cartItemsMapped = cart.items.map(({product ,quantity, unitPrice} : any) => 
            ({productId: product._id, title: product.title, image: product.image, quantity, unitPrice: unitPrice}))
        setCartItems([...cartItemsMapped])
        setTotalAmout(cart.totalAmount)

    } catch (error) {
        console.error(error)

    }
}
    
    const RemoveItemInCart = async (productId: string) => {
try{
    const response = await fetch(`https://ecommerce-2j15.onrender.com/cart/items/${productId}`, {
         
        method: "DELETE",
        headers: {
            
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            productId,
            
        })
        });
        if(!response.ok){
        setError('Failed to delete from cart');
        }


        const cart = await response.json();
        if(!cart){
            setError("failed to parse cart data")
        }

        const cartItemsMapped = cart.items.map(({product ,quantity, unitPrice} : any) => 
            ({productId: product._id, title: product.title, image: product.image, quantity, unitPrice: unitPrice}))
        setCartItems([...cartItemsMapped])
        setTotalAmout(cart.totalAmount)

    } catch (error) {
        console.error(error)

    }
    }

    const clearCart  = async () => {
        try{
    const response = await fetch(`https://ecommerce-2j15.onrender.com/cart/`, {
         
        method: "DELETE",
        headers: {
            
            "Authorization": `Bearer ${token}`
        },
        
        });
        if(!response.ok){
        setError('Failed to delete from cart');
        }


        const cart = await response.json();
        if(!cart){
            setError("failed to parse cart data")
        }

        const cartItemsMapped = cart.items.map(({product ,quantity, unitPrice} : any) => 
            ({productId: product._id, title: product.title, image: product.image, quantity, unitPrice: unitPrice}))
        setCartItems([])
        setTotalAmout(0)

    } catch (error) {
        console.error(error)

    }
    }

    return(
        <CartContext.Provider value = {{cartItems, totalAmount, addItemToCart, updateIteminCart, RemoveItemInCart, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

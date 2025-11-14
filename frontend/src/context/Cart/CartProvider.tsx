import { FC, PropsWithChildren, useState } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "../../types/CartItem";
import { useAuth } from "../Auth/Authcontext";



const CartProvider: FC<PropsWithChildren> = ({children}) => {
const {token} = useAuth()
const [cartItems, setCartItems] = useState<CartItem[]>([]);
const [totalAmount, setTotalAmout] = useState<number>(0);
const [error, setError] = useState('');

const addItemToCart = async (productId: string) => {
    try{
    const response = await fetch("http://localhost:3001/cart/items", {
         
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

    
    
    return(
        <CartContext.Provider value={{cartItems, totalAmount, addItemToCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
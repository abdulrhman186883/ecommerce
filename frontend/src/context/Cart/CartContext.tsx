import { createContext, useContext } from "react";
import { CartItem } from "../../types/CartItem";

interface CartContextType {
  cartItems: CartItem[];
  totalAmount: number;
  addItemToCart: (productId: string) => void;
  updateIteminCart: (productId:string, quantity: number) => void;
  RemoveItemInCart: (productId:string) => void;
  clearCart:() => void;
}




export const CartContext = createContext<CartContextType>({ 
cartItems: [],
totalAmount: 0,
addItemToCart: () => {},
updateIteminCart:() => {},
RemoveItemInCart:() => {},
clearCart:() => {}
});

export const useCart = () => useContext(CartContext);

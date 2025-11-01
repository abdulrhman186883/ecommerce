import { cartModel } from "../models/cartModel.js";

interface CreateCartForUser{
    userId: string;
}

const createCartForUser  = async ({userId} : CreateCartForUser)  => {
    const cart = await cartModel.create({userId, totalAmount: 0 })
    await cart.save();
    return cart;
}


interface GetActiveCartForUSer {
    userId: string;
}


export const getActiveCartforUser = async ({userId}: GetActiveCartForUSer) => {
    let cart = await cartModel.findOne({userId, status: "active"}) 


    if(!cart){
        cart = await createCartForUser({userId})
    }
    
    return cart;

}
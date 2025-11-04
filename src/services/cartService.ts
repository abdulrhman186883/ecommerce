import { cartModel } from "../models/cartModel.js";
import { productModel } from "../models/productModel.js";


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

interface AdditemToCart{
    productId: any;
    quantity: string;
    userId: string;

}




export const addItemToCart = async ({productId, quantity, userId}: AdditemToCart) =>{
    const cart = await getActiveCartforUser({ userId });


    const existsInCart = (await cart).items.find((p) => p.product.toString() === productId)

    if(existsInCart) {
        return {data: "item already exists in cart!", statusCode: 400};
    }




    const product = await productModel.findById(productId);

    



    if (!product){
        return {data: "product not found ! ", stutusCode: 400};

    }


    if(product.stock < parseInt(quantity)){
        return {data: "low Stock for item", statusCode: 400};

    }


    cart.items.push({product: productId, unitPrice: product.price, quantity: parseInt(quantity)})

    cart.totalAmount += product.price * parseInt(quantity);
    
    const updatedCart = await cart.save();

    return {data: updatedCart, statusCode: 200}
}

interface UpdateitemInCart{
    productId: any;
    quantity: string;
    userId: string;

}

export const updateItemInCart = async ({productId, quantity, userId}: UpdateitemInCart)  => {
 const cart = await getActiveCartforUser({ userId });
 const existsInCart = (await cart).items.find((p) => p.product.toString() === productId)

    if(!existsInCart) {
        return {data: "item does not exists in cart!", statusCode: 400};
    }

    const product = await productModel.findById(productId);
    if (!product){
        return {data: "product not found ! ", stutusCode: 400};

    }
    if(product.stock < parseInt(quantity)){
                return {data: "low Stock for item", statusCode: 400};

            }

    const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId);
    let total = otherCartItems.reduce((sum, product) =>{
        sum += product.quantity * product.unitPrice;
        return sum;
    }, 0)

    total += existsInCart.quantity * existsInCart.unitPrice;
    existsInCart.quantity = parseInt(quantity);

    cart.totalAmount = total;
    const updatedCart = await cart.save();
    

    return {data: updatedCart, statusCode: 200};
}
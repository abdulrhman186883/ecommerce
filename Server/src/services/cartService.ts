import { cartModel } from "../models/cartModel.js";
import { productModel } from "../models/productModel.js";
import { orderModel, type IorderItem } from "../models/orderModel.js";

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
    populateProduct?: boolean;
}


export const getActiveCartforUser = async ({
    userId,
    populateProduct


}: GetActiveCartForUSer) => {
    let cart;
    if(populateProduct){
    cart = await cartModel.findOne({userId, status: "active"}).populate('items.product')
    } else {
        cart = await cartModel.findOne({userId, status: "active"})
    }
    


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
    
    await cart.save();

    return {data: await getActiveCartforUser({userId,populateProduct: true}), statusCode: 200}
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
    await cart.save();
    

    return {data: await getActiveCartforUser({userId,populateProduct: true}), statusCode: 200};
}




interface DeleteitemInCart{
    productId: any;
    userId: string;

}

 export const deleteItemInCart = async ({userId, productId}: DeleteitemInCart) =>{
const cart = await getActiveCartforUser({ userId });

const existsInCart = (await cart).items.find((p) => p.product.toString() === productId);

    if(!existsInCart) {
        return {data: "item does not exists in cart!", statusCode: 400};
    }

    const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId);


    const total = otherCartItems.reduce((sum, product) =>{
        sum += product.quantity * product.unitPrice;
        return sum;
    }, 0)



    cart.items = otherCartItems;
    cart.totalAmount = total;
    await cart.save();
    
    const populatedCart = await getActiveCartforUser({
    userId,
    populateProduct: true,
  });
    return {data: populatedCart, statusCode: 200};
 }
 

 interface Clearart{
    
    userId: string;

}
export const clearCart  = async ({userId}: Clearart) =>{ 
    const cart = await getActiveCartforUser({userId});

    cart.items = [];
    cart.totalAmount = 0;
    const updatedCart = await cart.save();
    return {data: updatedCart, statusCode:200}

}

interface Checkout{
userId: string;
address: string;
}


export const checkout = async ({userId, address}: Checkout) => {

if(!address){
    return {data: "please add the address", statusCode: 400}
}


const cart = getActiveCartforUser({userId});



const orderItems = [];

for (const item of (await cart).items){

const product = await productModel.findById(item.product)


if(!product){
    return {data: "product not found", statusCode:400}
}

const orderItem: IorderItem = {
    productTitle: product?.title,
    productImage: product?.image,
    quantity: item.quantity,
    unitPrice: item.unitPrice
}
orderItems.push(orderItem)
}

const order = await orderModel.create({
    orderItems,
    userId,
    total: (await cart).totalAmount,
    address
});

await order.save();
(await cart).status = "completed";
(await cart).save();
return {data: order, statusCode: 200};

}
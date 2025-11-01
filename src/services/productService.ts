import { productModel } from "../models/prodectModel.js";



export const getAllProducts = async() => {
    return await productModel.find()
}


export const seedInstialProducts = async () => {
    const products = [
        {title: "Product 1", image: "image.jpg", price: 10 , stock: 100},
        
    ]

const existproducts = await getAllProducts();
if(existproducts.length === 0){
    await productModel.insertMany(products)
}

};
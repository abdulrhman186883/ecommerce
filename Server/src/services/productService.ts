import { productModel } from "../models/productModel.js";



export const getAllProducts = async() => {
    return await productModel.find()
}



export const seedInstialProducts = async () => {
    const products = [
        {title: "Lenovo Laptop 15.6 FHD", image: "https://m.media-amazon.com/images/I/71tWgdVYWGL._AC_UY218_.jpg", price: 439 , stock: 100},
         {title: "HP Laptop, 15.6 Inch FHD Display", image: "https://m.media-amazon.com/images/I/71KnnwJlHBL._AC_UY218_.jpg", price: 359 , stock: 100},
          {title: "Blackview Ryzen 7 7735HS 2025", image: "https://m.media-amazon.com/images/I/713MmJqH-QL._AC_SY300_SX300_QL70_ML2_.jpg", price: 1999 , stock: 100},
    ]
    

const existproducts = await getAllProducts();
if(existproducts.length === 0){
    await productModel.insertMany(products)
}

};
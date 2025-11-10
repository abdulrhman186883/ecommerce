import mongoose, { Schema, Document, Model } from "mongoose";
import type { ObjectId } from "mongoose";
import type { IProduct } from "./productModel.js";



const CartStatusEnum = ["active", "completed"]


export interface IcartItem  {
    product: IProduct;
    unitPrice: number;
    quantity: number;
}



export interface ICart extends Document {
    userId : ObjectId | string;
    items: IcartItem[];
    totalAmount: number;
    status: "active" | "completed"

}


const CartItemSchema: Schema = new Schema<IcartItem>(

  {
     product: { type: Schema.Types.ObjectId, ref: "Product", required: true},
     quantity: {type: Number, required: true, default: 1},
     unitPrice: {type: Number, required: true},

  }
);

const CartSchema = new Schema<ICart>({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    items: [CartItemSchema],
    totalAmount : { type: Number, required: true},
    status: {type: String, enum: CartStatusEnum, default: "active"}
})


export const cartModel: Model<ICart> =
  mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);
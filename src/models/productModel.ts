import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  title: string;
  image: string;
  price: string;
  stock: number;
}

const ProductSchema: Schema = new Schema<IProduct>({
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
});

// ✅ Prevent OverwriteModelError during hot reload or multiple imports
export const productModel: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

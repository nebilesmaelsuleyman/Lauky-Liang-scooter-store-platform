import mongoose, { Schema, models } from "mongoose";

const productSchema = new Schema(
  {
    name: String,
    price: Number,
    
    description: String,
  },
  { timestamps: true }
);

const Product = models.Product || mongoose.model("Product", productSchema);

export default Product;

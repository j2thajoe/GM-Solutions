import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  stock: Number,
  category: String,
  delivery: String,
  images: [String],
});

export default mongoose.model("Product", productSchema);

import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 }, // ⬅️ FIX
  image: { type: String },
});

export default mongoose.model("Item", ItemSchema);

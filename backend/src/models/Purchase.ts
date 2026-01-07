import mongoose, { Schema, Types } from "mongoose";

const PurchaseSchema = new Schema(
  {
    user: {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
    },
    items: [
      {
        itemId: {
          type: Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },
        name: String,
        qty: Number,
      },
    ],
    totalItems: Number,
  },
  { timestamps: true }
);

export default mongoose.model(
  "Purchase",
  PurchaseSchema,
  "pembelian"
);

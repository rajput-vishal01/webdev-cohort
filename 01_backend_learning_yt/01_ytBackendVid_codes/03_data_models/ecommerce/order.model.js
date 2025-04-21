import mongoose from "mongoose";

//Mini Model
const orderItemsSchema = mongoose.Schema({
  productId: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    orderPrice: {
      type: Number,
      required: true,
    },
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    orderItems: {
      type: [orderItemsSchema], //as only this schema is using the orderItemsSchema no need to export it
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Canelled", "delivered"], // only options to choose from 
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);

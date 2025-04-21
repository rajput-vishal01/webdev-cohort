import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId, // one who is subscribing
      ref: "User",
    },
    channel: {
      type: Schema.Types.ObjectId, // channel user/owner
      ref: "User",
    },
  },
  {
    timestamps: true, // Correctly set the timestamps option
  }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);

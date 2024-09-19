const mongoose = require("mongoose"),
  { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    quantity: { type: Number, default: 1 },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Order", orderSchema);

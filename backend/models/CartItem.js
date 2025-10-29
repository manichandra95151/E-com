const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CartItemSchema = new Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    name: String,
    price: Number,
    qty: { type: Number, default: 1 },
    image: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("CartItem", CartItemSchema);

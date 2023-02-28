const mongoose = require("mongoose");

const SingleOrderItemScheme = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  size: { type: Number, required: true },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const OrderScheme = mongoose.Schema({
  shippingFee: { type: String },
  total: { type: Number, required: true },
  orderItems: [SingleOrderItemScheme],
  status: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  reference: { type: String, required: true },
});

module.exports = mongoose.model("Order", OrderScheme);

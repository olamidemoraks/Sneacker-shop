const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      required: [true, "Please provide product name."],
      type: String,
    },
    description: {
      required: [true, "Please provide product description."],
      type: String,
    },
    price: {
      required: [true, "Please provide product price."],
      type: Number,
      default: 0,
    },
    image: {
      required: true,
      type: String,
    },
    brand: {
      type: String,
      required: [true, "Please provide product brand name."],
    },
    feature: {
      type: Boolean,
      default: false,
    },
    size: {
      type: [Number],
      default: 40,
      // required: true,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    averageRating: {
      type: Number,
      default: 4,
    },
    inventory: {
      type: Number,
      default: 10,
      required: true,
    },
    // userId:{
    //     required: true,
    //     type: mongoose.Types.ObjectId,
    //     ref: "User"
    // }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

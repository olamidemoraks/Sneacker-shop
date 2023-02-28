const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Order = require("../models/Order");
const Product = require("../models/Product");

const createOrder = async (req, res) => {
  const { cartItems, total, status, reference } = req.body;

  if (!cartItems || cartItems.length === 0) {
    throw new CustomError.BadRequestError("No Item Provide In Card");
  }

  let orderItems = [];
  for (let item of cartItems) {
    const singleOrderItem = {
      name: item.name,
      image: item.image,
      amount: item.quantity,
      price: item.price,
      size: item.size,
      product: item.id,
    };

    orderItems = [...orderItems, singleOrderItem];
  }

  const order = await Order.create({
    orderItems,
    reference,
    total,
    status,
    user: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json({ order });
};

const getAllOrder = async (req, res) => {
  const order = await Order.find({}).sort("createdAt -1");
  res.status(StatusCodes.OK).json({ order });
};

const getSingleOrder = async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findById({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError("order not found");
  }

  res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  createOrder,
  getAllOrder,
};

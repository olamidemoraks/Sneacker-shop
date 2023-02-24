const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const path = require("path");
const fs = require("fs");

const createProduct = async (req, res) => {
  req.body.size = req.body.shoeSize.split(",");
  const newProduct = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ newProduct });
};

const getProducts = async (req, res) => {
  const products = await Product.find({}).exec();

  res.status(StatusCodes.OK).json({ products });
};

const getProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) throw new NotFoundError(`No Product with id: ${productId}`);

  res.status(StatusCodes.OK).json({ product });
};

const editProduct = async (req, res) => {

  req.body.size = req.body.shoeSize.split(",");
  const { id: productId } = req.body;
  const product = await Product.findOne({ _id: productId }).lean();
  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!updatedProduct)
    throw new NotFoundError(`No Product with id: ${productId}`);

  if (product.image !== updatedProduct.image) {
    const filename = getImage(product.image);
   
    const isDuplicate = await Product.findOne({ image: filename }).lean();
    if (isDuplicate) {
     
    } else {
      deleteImage(filename);
    }
  }

  res.status(StatusCodes.OK).json({ updatedProduct });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) throw new NotFoundError(`No Product with id: ${productId}`);

  const deleteProducted = await product.remove({ new: true });
  const filename = getImage(deleteProducted.image);

  const isDuplicate = await Product.findOne({ image: filename }).lean();
  if (isDuplicate) {
    
  } else {
    deleteImage(filename);
  }
  res.status(StatusCodes.OK).json({ msg: "Success! Product removed." });
};

const getImage = (name) => {
  const filename = path.basename(`/assets/${name}`);
  return filename;
};
const deleteImage = (filename) => {
  fs.unlink(path.join(__dirname, `../public/assets/${filename}`), (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Delete Successfull");
  });
};

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  deleteProduct,
  editProduct,
};

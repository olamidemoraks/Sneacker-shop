const express = require("express");
const {
  getProduct,
  getProducts,
  deleteProduct,
  editProduct,
} = require("../controllers/productController");
const {
  autheticateUser,
  authorizedPermission,
} = require("../middleware/authentication");
const router = express.Router();

router.route("/").get(getProducts);
router
  .route("/:id")
  .delete([autheticateUser, authorizedPermission("admin")], deleteProduct)
  .get(getProduct);

// router
//   .route("/")
//   .patch([autheticateUser, authorizedPermission("admin")], editProduct);

module.exports = router;

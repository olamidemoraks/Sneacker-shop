const express = require("express");
const { createOrder, getAllOrder } = require("../controllers/orderController");
const {
  autheticateUser,
  authorizedPermission,
} = require("../middleware/authentication");

const router = express.Router();

router.route("/createOrder").post(autheticateUser, createOrder);
router
  .route("/getAllOrder")
  .get([autheticateUser, authorizedPermission("admin"), getAllOrder]);

module.exports = router;

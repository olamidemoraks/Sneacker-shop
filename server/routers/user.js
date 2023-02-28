const express = require("express");
const router = express.Router();
const {
  authorizedPermission,
  autheticateUser,
} = require("../middleware/authentication");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  updateUserInformation,
} = require("../controllers/userController");

router
  .route("/")
  .get(autheticateUser, authorizedPermission("admin"), getAllUsers);

router.route("/showMe").get(autheticateUser, showCurrentUser);
router.route("/updateUser").patch(autheticateUser, updateUser);
router.route("/updateUserPassword").patch(autheticateUser, updateUserPassword);
router
  .route("/updateUserInformation")
  .patch(autheticateUser, updateUserInformation);
router.route("/:id").get(autheticateUser, getSingleUser);

module.exports = router;

const { UnauthorizedError } = require("../errors");

const checkPermission = (authorizeUser, authorizeUserId) => {
  if (authorizeUser.role === "superUser") return;
  if (authorizeUser._id === authorizeUserId) return;
  throw new UnauthorizedError("'Not authorized to access this route'");
};

module.exports = checkPermission;

const { UnauthenticatedError, UnauthorizedError } = require("../errors");
const { isTokenValid } = require("../utils/jwt");

const autheticateUser = (req, res, next) => {
  let token = "";
  token = req.signedCookies.token;
  if (!token) {
    const authHeader = req.headers.authorization;
    console.log("header", authHeader);
    if (!authHeader && authHeader.startsWith("Bearer")) {
      throw new UnauthenticatedError("Authentication Invalid");
    }
    token = authHeader.split(" ")[1];
  }
  console.log("TOKEN", token);
  try {
    const { userId, name, role } = isTokenValid({ token });
    req.user = { userId, name, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

const authorizedPermission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorize to access this path");
    }
    next();
  };
};

module.exports = {
  autheticateUser,
  authorizedPermission,
};

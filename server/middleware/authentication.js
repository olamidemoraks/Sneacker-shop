const { UnauthenticatedError, UnauthorizedError } = require("../errors");
const { isTokenValid } = require("../utils/jwt");

const autheticateUser = (req, res, next) => {
  const token = req.signedCookies.token;
  console.log(token);
  if (!token) throw new UnauthenticatedError("Authentication Invalid");
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

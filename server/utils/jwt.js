const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, req, token }) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const domain = req.headers.host;
  console.log("DOMAIN", domain);
  res.cookie("token", token, {
    httpOnly: true,
    domain: domain,
    path: "/",
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};

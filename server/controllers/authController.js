const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthorizedError } = require("../errors");
const createTokenUser = require("../utils/createToken");
const { attachCookiesToResponse, createJWT } = require("../utils/jwt");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide credentials");
  }
  const user = await User.findOne({ email });
  if (!user) throw new UnauthorizedError("Invalid Credentials");
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid Credentials");
  }
  const tokenUser = createTokenUser(user);
  const token = createJWT({ payload: tokenUser });
  attachCookiesToResponse({ res, req, token });

  res.status(StatusCodes.OK).json({ user: tokenUser, token });
};

const register = async (req, res) => {
  const { email } = req.body;
  const isEmailAlreadyExist = await User.findOne({ email }).exec();
  if (isEmailAlreadyExist) throw new BadRequestError("Email already exist");

  const isFirstAccount = (await User.countDocuments({})) === 0;

  req.body.role = isFirstAccount ? "admin" : "user";
  const user = await User.create(req.body);
  const tokenUser = createTokenUser(user);
  const token = createJWT({ payload: tokenUser });
  attachCookiesToResponse({ res, req, token });
  res.status(StatusCodes.CREATED).json({ user: tokenUser.token });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

module.exports = {
  login,
  register,
  logout,
};

require("dotenv").config();
require("express-async-errors");
// express

const express = require("express");
const app = express();
// rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const {
  createProduct,
  editProduct,
} = require("./controllers/productController");
const productRouter = require("./routers/product");
const authRouter = require("./routers/auth");
const userRouter = require("./routers/user");
const corOptions = require("./config/corsOption");
const orderRouter = require("./routers/order");

//middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDb = require("./db/connectDb");
const {
  autheticateUser,
  authorizedPermission,
} = require("./middleware/authentication");

app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(xss());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(bodyParser.json({ limit: "30mb", extend: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use(cors(corOptions));

//File storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
app.post(
  "/api/v1/product",
  upload.single("picture"),
  [autheticateUser, authorizedPermission("admin")],
  createProduct
);
app.patch(
  "/api/v1/product",
  upload.single("picture"),
  [autheticateUser, authorizedPermission("admin")],
  editProduct
);

app.get("/", (req, res) => {
  res.send("We are live");
});
app.use("/api/v1/product", productRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/order", orderRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const PORT = process.env.PORT || 4500;
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    app.listen(PORT, () => console.log("You are alive"));
  } catch (error) {
    console.log(error);
  }
};

start();

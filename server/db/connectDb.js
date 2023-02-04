const mongoose = require("mongoose");

const connectDb = (url) => {
  return mongoose.connect(url, { family: 4 });
};

module.exports = connectDb;

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    maxlength: 50,
    minlength: 3,
  },
  email: {
    unique: true,
    type: String,
    required: [true, "Please provide email"],
    // validate: {
    //   validator: validator.isEmail,
    //   message: 'Please provide valid email',
    // },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 5,
  },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "superAdmin", "user"],
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", userSchema);

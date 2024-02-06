const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "A user name is required"],
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "A password is required"],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  console.log(this.password);
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (
  userPassword,
  hashedPassword
) {
  return await bcrypt.compare(userPassword, hashedPassword);
};

const User = new mongoose.model("users", userSchema);

module.exports = User;

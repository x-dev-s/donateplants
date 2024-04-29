import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide a Username"],
  },

  phone: {
    type: String,
    required: [true, "Please Provide a Phone Number"],
    unique: true,
  },

  email: {
    type: String,
    required: [true, "Please Provide a Email"],
    unique: true,
  },

  password: {
    type: String,
    required: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.Users || mongoose.model("Users", userSchema);


export default User;


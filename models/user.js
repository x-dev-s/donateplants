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
  balance: {
    type: Number,
    default: 0,
  },
  deposits: [
    {
      amount: Number,
      date: Date,
    },
  ],
  draws: [
    {
      active: Boolean,
      drawName: String,
      drawType: String,
      amount: Number,
      date: Date,
    },
  ],
  donations: [
    {
      donationType: String,
      amount: Number,
      date: Date,
    },
  ],
  drawsWon: [
    {
      drawType: String,
      prize: String,
      amount: Number,
    },
  ],
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.USER || mongoose.model("USER", userSchema);


export default User;


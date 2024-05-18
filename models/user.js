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
      method: String,
      date: {
        type: Date,
        default: Date.now(),
      }
    },
  ],
  draws: [
    {
      active: Boolean,
      drawName: String,
      drawType: String,
      numbers: [Number],
      date: Date,
    },
  ],
  donations: [
    {
      donationType: String,
      amount: Number,
      date: Date,
      plantStatus: Boolean,
      plantedOn: Date,
      plantLocation: String,
    },
  ],
  drawsWon: [
    {
      drawId: String,
      prize: String,
      amount: Number,
    },
  ],
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);


export default User;


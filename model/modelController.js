const mongoose = require("mongoose");
const date = new Date();
const barberSchema = new mongoose.Schema(
  {
    Name: { type: String, required: [true, "Your Name is required"] },
    email: {
      type: String,
      unique: true,
      required: [true, "Your Email is required"],
    },
    password: { type: String, required: [true, "Password is required"] },
    favouriteHC: { type: String, require: [true, "Hair cut is required"] },
  },
  { timestamps: true }
);
const barberModel = mongoose.model("theBarberShop", barberSchema);

module.exports = barberModel;

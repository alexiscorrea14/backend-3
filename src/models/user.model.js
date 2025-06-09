import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  role: String,
  pets: { type: Array, default: [] },
});

export const User = mongoose.model("User", userSchema);

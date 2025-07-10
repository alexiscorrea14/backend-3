import { User } from "../models/user.model.js";

export async function insertUsers(users) {
  return await User.insertMany(users);
}

export async function getUsers() {
  return await User.find().lean();
}

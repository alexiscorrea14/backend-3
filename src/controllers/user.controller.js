import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

export async function getAllUsers(req, res) {
  try {
    const users = await User.find().lean();
    res.json({ status: "success", data: users });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
    res.json({ status: "success", data: user });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function createUser(req, res) {
  try {
    const { first_name, last_name, email, password, role = "user" } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ status: "error", message: "Faltan datos requeridos" });
    }

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: "error", message: "Email ya registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role,
      pets: [],
    });

    res.status(201).json({ status: "success", data: newUser });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function updateUser(req, res) {
  try {
    const updateData = { ...req.body };

    
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).lean();

    if (!user) return res.status(404).json({ status: "error", message: "Usuario no encontrado" });

    res.json({ status: "success", data: user });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id).lean();

    if (!user) return res.status(404).json({ status: "error", message: "Usuario no encontrado" });

    res.json({ status: "success", message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

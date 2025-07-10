import { Adoption } from "../models/adoption.model.js";

export async function getAllAdoptions(req, res) {
  try {
    const adoptions = await Adoption.find().lean();
    res.json({ status: "success", data: adoptions });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function getAdoptionById(req, res) {
  try {
    const adoption = await Adoption.findById(req.params.id).lean();
    if (!adoption) return res.status(404).json({ status: "error", message: "Adopción no encontrada" });
    res.json({ status: "success", data: adoption });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function createAdoption(req, res) {
  try {
    const { userId, petId } = req.body;
    if (!userId || !petId) return res.status(400).json({ status: "error", message: "Faltan datos requeridos" });
    const newAdoption = await Adoption.create({ userId, petId, status: "pending" });
    res.status(201).json({ status: "success", data: newAdoption });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function updateAdoption(req, res) {
  try {
    const updateData = req.body;
    const adoption = await Adoption.findByIdAndUpdate(req.params.id, updateData, { new: true }).lean();
    if (!adoption) return res.status(404).json({ status: "error", message: "Adopción no encontrada" });
    res.json({ status: "success", data: adoption });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function deleteAdoption(req, res) {
  try {
    const adoption = await Adoption.findByIdAndDelete(req.params.id).lean();
    if (!adoption) return res.status(404).json({ status: "error", message: "Adopción no encontrada" });
    res.json({ status: "success", message: "Adopción eliminada" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

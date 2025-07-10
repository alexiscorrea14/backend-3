import { Adoption } from "../models/adoption.model.js";

export async function getAllAdoptions(req, res) {
  try {
    const adoptions = await Adoption.find().populate("userId petId").lean();
    res.json({ status: "success", data: adoptions });
  } catch (error) {
    console.error("Error getAllAdoptions:", error);
    res.status(500).json({ status: "error", message: "Error al obtener adopciones" });
  }
}

export async function getAdoptionById(req, res) {
  const { id } = req.params;
  try {
    const adoption = await Adoption.findById(id).populate("userId petId").lean();
    if (!adoption) {
      return res.status(404).json({ status: "error", message: "Adopción no encontrada" });
    }
    res.json({ status: "success", data: adoption });
  } catch (error) {
    console.error("Error getAdoptionById:", error);
    res.status(500).json({ status: "error", message: "Error al obtener adopción" });
  }
}

export async function createAdoption(req, res) {
  const { userId, petId } = req.body;

  if (!userId || !petId) {
    return res.status(400).json({ status: "error", message: "Faltan userId o petId" });
  }

  try {
    const newAdoption = new Adoption({ userId, petId });
    const savedAdoption = await newAdoption.save();
    res.status(201).json({ status: "success", data: savedAdoption });
  } catch (error) {
    console.error("Error createAdoption:", error);
    res.status(500).json({ status: "error", message: "Error al crear adopción" });
  }
}

export async function updateAdoption(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const adoptionUpdated = await Adoption.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).lean();

    if (!adoptionUpdated) {
      return res.status(404).json({ status: "error", message: "Adopción no encontrada" });
    }

    res.json({ status: "success", data: adoptionUpdated });
  } catch (error) {
    console.error("Error updateAdoption:", error);
    res.status(500).json({ status: "error", message: "Error al actualizar adopción" });
  }
}

export async function deleteAdoption(req, res) {
  const { id } = req.params;

  try {
    const deleted = await Adoption.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ status: "error", message: "Adopción no encontrada" });
    }
    res.json({ status: "success", message: "Adopción eliminada" });
  } catch (error) {
    console.error("Error deleteAdoption:", error);
    res.status(500).json({ status: "error", message: "Error al eliminar adopción" });
  }
}

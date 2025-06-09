import { Router } from "express";
import { generateUsersMock } from "../services/mocking.service.js";
import { User } from "../models/user.model.js";
import { Pet } from "../models/pet.model.js";

const router = Router();

router.get("/mockingpets", async (req, res) => {
  try {
    const pets = await Pet.find().lean();
    res.json({ status: "success", data: pets });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

router.get("/mockingusers", async (req, res) => {
  try {
    const users = await generateUsersMock(50);
    res.json({ status: "success", data: users });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

router.post("/generateData", async (req, res) => {
  const { users = 0, pets = 0 } = req.body;

  try {
    const usersToInsert = await generateUsersMock(users);

    const petsToInsert = [];
    for (let i = 0; i < pets; i++) {
      petsToInsert.push({
        name: `Mascota${i + 1}`,
        species: "perro",
        age: Math.floor(Math.random() * 10) + 1,
      });
    }

    await User.insertMany(usersToInsert);
    await Pet.insertMany(petsToInsert);

    res.json({
      status: "success",
      message: `${users} usuarios y ${pets} mascotas generados e insertados`,
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find().lean();
    res.json({ status: "success", data: users });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al obtener usuarios" });
  }
});

router.get("/pets", async (req, res) => {
  try {
    const pets = await Pet.find().lean();
    res.json({ status: "success", data: pets });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al obtener mascotas" });
  }
});

export default router;

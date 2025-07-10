import * as mockingService from "../services/mocking.service.js";

export async function getMockingUsers(req, res) {
  try {
    const users = await mockingService.generateUsersMock(50);
    res.json({ status: "success", data: users });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
}

export async function getMockingPets(req, res) {
  try {
    const pets = await mockingService.getAllPets();
    res.json({ status: "success", data: pets });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
}

export async function postGenerateData(req, res) {
  const { users = 0, pets = 0 } = req.body;

  try {
    const usersToInsert = await mockingService.generateUsersMock(users);
    const petsToInsert = await mockingService.generatePetsMock(pets);

    await mockingService.saveUsers(usersToInsert);
    await mockingService.savePets(petsToInsert);

    res.json({
      status: "success",
      message: `${users} usuarios y ${pets} mascotas generados e insertados`,
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await mockingService.getAllUsers();
    res.json({ status: "success", data: users });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al obtener usuarios" });
  }
}

export async function getPets(req, res) {
  try {
    const pets = await mockingService.getAllPets();
    res.json({ status: "success", data: pets });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al obtener mascotas" });
  }
}

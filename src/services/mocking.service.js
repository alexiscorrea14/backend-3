import bcrypt from "bcrypt";
import * as userRepository from "../repositories/user.repository.js";
import * as petRepository from "../repositories/pet.repository.js";

function getRandomRole() {
  return Math.random() < 0.5 ? "user" : "admin";
}

export async function generateUsersMock(quantity = 50) {
  const users = [];

  for (let i = 0; i < quantity; i++) {
    const passwordHash = await bcrypt.hash("coder123", 10);

    users.push({
      first_name: `Nombre${i + 1}`,
      last_name: `Apellido${i + 1}`,
      email: `user${i + 1}@mock.com`,
      password: passwordHash,
      role: getRandomRole(),
      pets: [],
    });
  }

  return users;
}

export async function generatePetsMock(quantity = 50) {
  const pets = [];

  for (let i = 0; i < quantity; i++) {
    pets.push({
      name: `Mascota${i + 1}`,
      species: "perro",
      age: Math.floor(Math.random() * 10) + 1,
    });
  }

  return pets;
}

export async function saveUsers(users) {
  return await userRepository.insertUsers(users);
}

export async function savePets(pets) {
  return await petRepository.insertPets(pets);
}

export async function getAllUsers() {
  return await userRepository.getUsers();
}

export async function getAllPets() {
  return await petRepository.getPets();
}

import { Pet } from "../models/pet.model.js";

export async function insertPets(pets) {
  return await Pet.insertMany(pets);
}

export async function getPets() {
  return await Pet.find().lean();
}

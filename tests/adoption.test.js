import request from "supertest";
import app from "../app.js";
import { connect, closeDatabase, clearDatabase } from "./setup.js";
import { User } from "../src/models/user.model.js";
import { Pet } from "../src/models/pet.model.js";

jest.setTimeout(30000);

describe("Adoption Router", () => {
  let createdAdoptionId;
  let testUserId;
  let testPetId;

  beforeAll(async () => {
    await connect();

    const user = await User.create({
      first_name: "Test",
      last_name: "User",
      email: "testuser@example.com",
      password: "hashedpassword",
      role: "user",
      pets: [],
    });
    testUserId = user._id.toString();

    const pet = await Pet.create({
      name: "TestPet",
      species: "perro",
      age: 3,
    });
    testPetId = pet._id.toString();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  test("POST /api/adoption - crear adopción", async () => {
    const res = await request(app)
      .post("/api/adoption")
      .send({
        userId: testUserId,
        petId: testPetId,
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("_id");
    createdAdoptionId = res.body.data._id;
  });

  test("GET /api/adoption - obtener todas las adopciones", async () => {
    const res = await request(app).get("/api/adoption");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("GET /api/adoption/:id - obtener adopción por ID", async () => {
    const createRes = await request(app)
      .post("/api/adoption")
      .send({ userId: testUserId, petId: testPetId });
    const adoptionId = createRes.body.data._id;

    const res = await request(app).get(`/api/adoption/${adoptionId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("_id", adoptionId);
  });

  test("PUT /api/adoption/:id - actualizar adopción", async () => {
    const createRes = await request(app)
      .post("/api/adoption")
      .send({ userId: testUserId, petId: testPetId });
    const adoptionId = createRes.body.data._id;

    const res = await request(app)
      .put(`/api/adoption/${adoptionId}`)
      .send({ status: "approved" });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("status", "approved");
  });

  test("DELETE /api/adoption/:id - eliminar adopción", async () => {
    const createRes = await request(app)
      .post("/api/adoption")
      .send({ userId: testUserId, petId: testPetId });
    const adoptionId = createRes.body.data._id;

    const res = await request(app).delete(`/api/adoption/${adoptionId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Adopción eliminada");
  });
});

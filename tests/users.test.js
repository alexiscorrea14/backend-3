import request from "supertest";
import app from "../app.js";

describe("Users Router", () => {
  let createdUserId;

  test("POST /api/users - crear usuario", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        first_name: "Test",
        last_name: "User",
        email: "testuser@example.com",
        password: "coder123",
        role: "user"
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("_id");
    createdUserId = res.body.data._id;
  }, 10000);

  test("GET /api/users - obtener todos los usuarios", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  }, 10000);

  test("GET /api/users/:id - obtener usuario por ID", async () => {
    const res = await request(app).get(`/api/users/${createdUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("_id", createdUserId);
  }, 10000);

  test("PUT /api/users/:id - actualizar usuario", async () => {
    const res = await request(app)
      .put(`/api/users/${createdUserId}`)
      .send({ first_name: "TestUpdated" });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("first_name", "TestUpdated");
  }, 10000);

  test("DELETE /api/users/:id - eliminar usuario", async () => {
    const res = await request(app).delete(`/api/users/${createdUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Usuario eliminado");
  }, 10000);
});

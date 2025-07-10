import request from "supertest";
import app from "../app.js"; 

describe("Adoption Router", () => {
  let createdAdoptionId;

  test("POST /api/adoption - crear adopción", async () => {
    const res = await request(app)
      .post("/api/adoption")
      .send({
        userId: "64c2a9c964a53a2c4e1d2d20", 
        petId: "64c2a9c964a53a2c4e1d2d21"
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
    const res = await request(app).get(`/api/adoption/${createdAdoptionId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("_id", createdAdoptionId);
  });

  test("PUT /api/adoption/:id - actualizar adopción", async () => {
    const res = await request(app)
      .put(`/api/adoption/${createdAdoptionId}`)
      .send({ status: "approved" });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("status", "approved");
  });

  test("DELETE /api/adoption/:id - eliminar adopción", async () => {
    const res = await request(app).delete(`/api/adoption/${createdAdoptionId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Adopción eliminada");
  });
});

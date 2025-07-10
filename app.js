import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import mocksRouter from "./src/routers/mocks.router.js";
import adoptionRouter from "./src/routers/adoption.router.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./src/docs/swagger.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/mocks", mocksRouter);
app.use("/api/adoption", adoptionRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Conectado a MongoDB Atlas");
      app.listen(PORT, () => {
        console.log(`Servidor corriendo en puerto ${PORT}`);
      });
    })
    .catch((err) => console.log("Error al conectar:", err));
}

export default app;

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import mocksRouter from "./src/routers/mocks.router.js";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch(err => console.log("Error al conectar:", err));

app.use("/api/mocks", mocksRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

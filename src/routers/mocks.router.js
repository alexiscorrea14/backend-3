import { Router } from "express";
import * as mocksController from "../controllers/mocks.controller.js";

const router = Router();

router.get("/mockingpets", mocksController.getMockingPets);
router.get("/mockingusers", mocksController.getMockingUsers);
router.post("/generateData", mocksController.postGenerateData);
router.get("/users", mocksController.getUsers);
router.get("/pets", mocksController.getPets);

export default router;

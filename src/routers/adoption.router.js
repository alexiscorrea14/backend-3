import { Router } from "express";
import * as adoptionController from "../controllers/adoption.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Adoption
 *   description: API para adopción de mascotas
 */

/**
 * @swagger
 * /adoption:
 *   get:
 *     summary: Obtener todas las adopciones
 *     tags: [Adoption]
 *     responses:
 *       200:
 *         description: Lista de adopciones
 */
router.get("/", adoptionController.getAllAdoptions);

/**
 * @swagger
 * /adoption/{id}:
 *   get:
 *     summary: Obtener adopción por ID
 *     tags: [Adoption]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la adopción
 *     responses:
 *       200:
 *         description: Adopción encontrada
 *       404:
 *         description: Adopción no encontrada
 */
router.get("/:id", adoptionController.getAdoptionById);

/**
 * @swagger
 * /adoption:
 *   post:
 *     summary: Crear una nueva adopción
 *     tags: [Adoption]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - petId
 *             properties:
 *               userId:
 *                 type: string
 *               petId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Adopción creada
 *       400:
 *         description: Datos inválidos
 */
router.post("/", adoptionController.createAdoption);

/**
 * @swagger
 * /adoption/{id}:
 *   put:
 *     summary: Actualizar una adopción por ID
 *     tags: [Adoption]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la adopción
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Adopción actualizada
 *       404:
 *         description: Adopción no encontrada
 */
router.put("/:id", adoptionController.updateAdoption);

/**
 * @swagger
 * /adoption/{id}:
 *   delete:
 *     summary: Eliminar adopción por ID
 *     tags: [Adoption]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la adopción
 *     responses:
 *       200:
 *         description: Adopción eliminada
 *       404:
 *         description: Adopción no encontrada
 */
router.delete("/:id", adoptionController.deleteAdoption);

export default router;

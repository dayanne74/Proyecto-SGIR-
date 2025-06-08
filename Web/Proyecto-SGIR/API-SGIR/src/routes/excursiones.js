import express from "express";
import {
  createExcursion,
  getExcursion,
  getExcursionById,
  updateExcursion,
  deleteExcursion
} from "../controllers/excursionesControllers.js";
import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Excursiones
 *   description: Gestión de excursiones turísticas
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Excursion:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           example: "Tour por la selva"
 *         descripcion:
 *           type: string
 *           example: "Exploración guiada por la selva amazónica"
 *         destino:
 *           type: string
 *           example: "Amazonas" 
 *         precio: 
 *           type: number
 *           format: float
 *           example: 150.50
 *         duracion:
 *           type: string
 *           example: "3 días"
 *         transporte:
 *           type: string
 *           example: "Lancha y caminata"
 *         comida:
 *           type: string
 *           example: "Incluye desayuno y almuerzo"
 *         actividad:
 *           type: string
 *           example: "Avistamiento de aves y paseo en canoa"
 *         imagen:
 *           type: string
 *           format: uri
 *           example: "https://ejemplo.com/selva.jpg"
 *       required:
 *         - nombre
 *         - descripcion
 *         - destino
 *         - precio
 *         - duracion
 *         - transporte
 *         - comida
 *         - actividad
 */

/**
 * @swagger
 * /api/excursiones:
 *   post:
 *     summary: Crea una nueva excursión (Requiere autenticación y rol Administrador)
 *     tags: [Excursiones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Excursion'
 *     responses:
 *       201:
 *         description: Excursión creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido (rol no autorizado)
 */
router.post("/excursiones", verifyToken, verifyRole(['administrador']), createExcursion);

/**
 * @swagger
 * /api/excursiones:
 *   get:
 *     summary: Obtiene todas las excursiones (Público)
 *     tags: [Excursiones]
 *     responses:
 *       200:
 *         description: Lista de excursiones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Excursion'
 */
router.get("/excursiones", getExcursion);

/**
 * @swagger
 * /api/excursiones/{id}:
 *   get:
 *     summary: Obtiene una excursión por ID (Público)
 *     tags: [Excursiones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la excursión
 *     responses:
 *       200:
 *         description: Información de la excursión
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Excursion'
 *       404:
 *         description: Excursión no encontrada
 */
router.get("/excursiones/:id", getExcursionById);

/**
 * @swagger
 * /api/excursiones/{id}:
 *   put:
 *     summary: Actualiza una excursión por ID (Requiere autenticación y rol Administrador)
 *     tags: [Excursiones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la excursión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Excursion'
 *     responses:
 *       200:
 *         description: Excursión actualizada exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido (rol no autorizado)
 *       404:
 *         description: Excursión no encontrada
 */
router.put("/excursiones/:id", verifyToken, verifyRole(['administrador']), updateExcursion);

/**
 * @swagger
 * /api/excursiones/{id}:
 *   delete:
 *     summary: Elimina una excursión por ID (Requiere autenticación y rol Administrador)
 *     tags: [Excursiones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la excursión
 *     responses:
 *       200:
 *         description: Excursión eliminada exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido (rol no autorizado)
 *       404:
 *         description: Excursión no encontrada
 */
router.delete("/excursiones/:id", verifyToken, verifyRole(['administrador']), deleteExcursion);

export default router;
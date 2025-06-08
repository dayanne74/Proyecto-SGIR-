import express from "express";
import {createExcursion, getExcursion, getExcursionById, updateExcursion, deleteExcursion} from "../controllers/excursionesControllers.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Excursion:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: nombre de la excursion
 *         descripcion:
 *           type: string
 *           descripcion: Una pequeña descripcion de lo que trata la excursion
 *         destino:
 *           type: string
 *           description: Punto de llegada de la excursion 
 *         precio: 
 *           type: number
 *           description: Precio por dias segun la nombre de la excursion
 *         duracion:
 *           type: string
 *           description: Dias de duracion de la excursion
 *         transporte:
 *           type: string
 *           description: Medio de trasporte para movilizarse en la excursion
 *         comida:
 *           type: string
 *           description: Tipo de comida el cual se ofrece en la excursion o destino
 *         actividad:
 *           type: string
 *           description: Actividades el cual se realizan durante la excursion
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
 *     summary: Crea una nueva excursion
 *     tags: [Excursiones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Excursion'
 *     responses:
 *       200:
 *         description: Excursion creada exitosamente
 */
router.post("/excursiones", createExcursion);

/**
 * @swagger
 * /api/excursiones:
 *   get:
 *     summary: Obtiene todas las excursiones creadas
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
 *     summary: Obtiene las excursiones por id
 *     tags: [Excursiones]
 *     parameters:
 *       - in: path
 *         name: id
 *         requiered: true
 *         schema:
 *           type: string
 *         description: Id de la excursion
 *     responses: 
 *       200:
 *         description: Informacion de la excursion
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Excursion' 
 */
router.get("/excursiones/:id", getExcursionById);

/**
 * @swagger
 * /api/excursiones/{id}:
 *   put:
 *     summary: Actualiza las excursiones por id
 *     tags: [Excursiones]
 *     parameters:
 *       - in: path
 *         name: id
 *         requiered: true
 *         schema:
 *           type: string
 *         description: Id de la excursion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Excursion'
 *     responses: 
 *       200:
 *         description: Excursion actualizada exitosamente 
 */
router.put("/excursiones/:id", updateExcursion);

/**
 * @swagger
 * /api/excursiones/{id}:
 *   delete:
 *     summary: Elimina las excursiones por id
 *     tags: [Excursiones]
 *     parameters:
 *       - in: path
 *         name: id
 *         requiered: true
 *         schema:
 *           type: string
 *         description: Id de la excursion
 *     responses: 
 *       200:
 *         description: Excursion eliminada exitosamente
 *       404:
 *         description: Excursion no encontrada
 */
router.delete("/excursiones/:id", deleteExcursion);

export default router;
import express from 'express';
import { createPaquete, getPaquete, updatePaquete, deletePaquete } from '../controllers/paquetecontrolador.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Paquete:
 *       type: object
 *       properties:
 *         destino:
 *           type: string
 *           description: Nombre del paquete
 *         actividad: 
 *           type: string
 *           description: Actividad del paquete
 *         descripcion:
 *           type: string
 *           description: Descripcion del paquete
 *         numeroPersonas:
 *           type: integer
 *           description: Número de personas
 *         nombre:                                              
 *           type: string
 *           description: Tipo de paquete
 *         precio:
 *           type: number
 *           description: Precio por persona
 *         transporte:
 *           type: string
 *           description: Tipo de transporte
 *           enum: [avion, bus]
 *         comida:
 *           type: string
 *           description: Tipo de comida incluida
 *       required:
 *         - destino
 *         - actividad
 *         - descripcion
 *         - numeroPersonas
 *         - nombre
 *         - precio
 *         - transporte
 *         - comida
 */

/**
 * @swagger
 * /api/paquete:
 *   post:
 *     summary: Crea un nuevo paquete
 *     tags: [paquete]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Paquete'
 *     responses:
 *       200:
 *         description: Paquete creado exitosamente
 */
router.post('/paquete', createPaquete);

/**
 * @swagger
 * /api/paquete:
 *   get:
 *     summary: Obtiene todos los paquetes
 *     tags: [paquete]
 *     responses:
 *       200:
 *         description: Lista de paquetes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paquete'
 */
router.get('/paquete', getPaquete);

/**
 * @swagger
 * /api/paquete/{id}:
 *   get:
 *     summary: Obtiene un paquete por ID
 *     tags: [paquete]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del paquete
 *     responses:
 *       200:
 *         description: Información del paquete
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paquete'
 */

router.put('/paquete/:id', updatePaquete);

/**
 * @swagger
 * /api/paquete/{id}:
 *   delete:
 *     summary: Elimina un paquete por ID
 *     tags: [paquete]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del paquete
 *     responses:
 *       200:
 *         description: Paquete eliminado exitosamente
 *       404:
 *         description: Paquete no encontrado
 */
router.delete('/paquete/:id', deletePaquete);

export default router;

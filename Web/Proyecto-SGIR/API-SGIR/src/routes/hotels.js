import express from 'express';
import { createHotel, getHotels, getHotelById, updateHotel, deleteHotel } from '../controllers/hotelcontrollers.js';
import { verifyToken, verifyRole } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Hoteles
 *   description: Gestión de hoteles y alojamientos
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
 *     Hotel:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           example: "Hotel Paradise"
 *         ubicacion:
 *           type: string
 *           example: "Playa del Carmen, México"
 *         numeroHabitaciones:
 *           type: integer
 *           minimum: 1
 *           example: 50
 *         numeroPersonas:
 *           type: integer
 *           minimum: 1
 *           example: 100
 *         comida:
 *           type: string
 *           example: "Todo incluido"
 *         precio:
 *           type: number
 *           format: float
 *           minimum: 0
 *           example: 150.75
 *         categoria:
 *           type: string
 *           enum: [baja, media, alta]
 *           example: "media"
 *         imagen:
 *           type: string
 *           format: uri
 *           example: "https://ejemplo.com/hotel.jpg"
 *         disponible:
 *           type: boolean
 *           example: true
 *       required:
 *         - nombre
 *         - ubicacion
 *         - numeroHabitaciones
 *         - numeroPersonas
 *         - comida
 *         - precio
 *         - categoria
 */

/**
 * @swagger
 * /api/hotels:
 *   post:
 *     summary: Crea un nuevo hotel (Requiere autenticación y rol Administrador)
 *     tags: [Hoteles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hotel'
 *     responses:
 *       201:
 *         description: Hotel creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido (rol no autorizado)
 */
router.post('/hotels', verifyToken, verifyRole(['administrador']), createHotel);

/**
 * @swagger
 * /api/hotels:
 *   get:
 *     summary: Obtiene todos los hoteles (Público)
 *     tags: [Hoteles]
 *     responses:
 *       200:
 *         description: Lista de hoteles disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hotel'
 */
router.get('/hotels', getHotels);

/**
 * @swagger
 * /api/hotels/{id}:
 *   get:
 *     summary: Obtiene un hotel por ID (Público)
 *     tags: [Hoteles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del hotel
 *     responses:
 *       200:
 *         description: Información detallada del hotel
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 *       404:
 *         description: Hotel no encontrado
 */
router.get('/hotels/:id', getHotelById);

/**
 * @swagger
 * /api/hotels/{id}:
 *   put:
 *     summary: Actualiza un hotel por ID (Requiere autenticación y rol Administrador)
 *     tags: [Hoteles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del hotel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hotel'
 *     responses:
 *       200:
 *         description: Hotel actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido (rol no autorizado)
 *       404:
 *         description: Hotel no encontrado
 */
router.put('/hotels/:id', verifyToken, verifyRole(['administrador']), updateHotel);

/**
 * @swagger
 * /api/hotels/{id}:
 *   delete:
 *     summary: Elimina un hotel por ID (Requiere autenticación y rol Administrador)
 *     tags: [Hoteles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del hotel
 *     responses:
 *       200:
 *         description: Hotel eliminado exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido (rol no autorizado)
 *       404:
 *         description: Hotel no encontrado
 */
router.delete('/hotels/:id', verifyToken, verifyRole(['administrador']), deleteHotel);

export default router;
import express from 'express';
import { createHotel, getHotels, getHotelById, updateHotel, deleteHotel } from '../controllers/hotelcontrollers.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Hotel:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del hotel
 *         ubicacion:
 *           type: string
 *           description: Ubicación del hotel
 *         numeroHabitaciones:
 *           type: integer
 *           description: Número de habitaciones del hotel
 *         numeroPersonas:
 *           type: integer
 *           description: Capacidad de personas del hotel
 *         comida:
 *           type: string
 *           description: Tipo de comida ofrecida en el hotel
 *         precio:
 *           type: number
 *           description: Precio por noche en el hotel
 *         categoria:
 *           type: string
 *           description: Categoría del hotel
 *           enum: [baja, media]
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
 *     summary: Crea un nuevo hotel
 *     tags: [hoteles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hotel'
 *     responses:
 *       200:
 *         description: Hotel creado exitosamente
 */
router.post('/hotels', createHotel);

/**
 * @swagger
 * /api/hotels:
 *   get:
 *     summary: Obtiene todos los hoteles
 *     tags: [hoteles]
 *     responses:
 *       200:
 *         description: Lista de hoteles
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
 *     summary: Obtiene un hotel por ID
 *     tags: [hoteles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del hotel
 *     responses:
 *       200:
 *         description: Información del hotel
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 */
router.get('/hotels/:id', getHotelById);

/**
 * @swagger
 * /api/hotels/{id}:
 *   put:
 *     summary: Actualiza un hotel por ID
 *     tags: [hoteles]
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
 */
router.put('/hotels/:id', updateHotel);

/**
 * @swagger
 * /api/hotels/{id}:
 *   delete:
 *     summary: Elimina un hotel por ID
 *     tags: [hoteles]
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
 *       404:
 *         description: Hotel no encontrado
 */
router.delete('/hotels/:id', deleteHotel);

export default router;
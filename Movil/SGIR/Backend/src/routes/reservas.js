import express from 'express';
import { obtenerReservas,obtenerReservaPorId, crearReserva, eliminarReserva } from '../controllers/reservacontrollers.js';

const router = express.Router();

/**
 * @swagger
 * /reservas:
 *   get:
 *     summary: Obtener todas las reservas
 *     responses:
 *       200:
 *         description: Lista de reservas
 */
router.get('/', obtenerReservas);

/**
 * @swagger
 * /reservas/{id}:
 *   get:
 *     summary: Obtener una reserva por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la reserva
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reserva encontrada
 *       404:
 *         description: Reserva no encontrada
 */
router.get('/:id', obtenerReservaPorId);

/**
 * @swagger
 * /reservas:
 *   post:
 *     summary: Crear una nueva reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipoDocumento:
 *                 type: string
 *               numeroDocumento:
 *                 type: string
 *               nombreCliente:
 *                 type: string
 *               fechaSalida:
 *                 type: string
 *                 format: date
 *               fechaRegreso:
 *                 type: string
 *                 format: date
 *               destino:
 *                 type: string
 *               numeroContacto:
 *                 type: string
 *               correoElectronico:
 *                 type: string
 *               tipoPaquete:
 *                 type: string
 *               cantidadPersonas:
 *                 type: integer
 *               alojamiento:
 *                 type: string
 *               transporte:
 *                 type: string
 *               precioTotal:
 *                 type: number
 *               estado:
 *                 type: string
 *               clienteId:
 *                 type: integer
 *               paqueteId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 */
router.post('/', crearReserva);



/**
 * @swagger
 * /reservas/{id}:
 *   delete:
 *     summary: Eliminar una reserva
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la reserva
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reserva eliminada exitosamente
 */
router.delete('/:id', eliminarReserva);


export default router;
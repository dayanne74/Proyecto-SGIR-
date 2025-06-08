import express from "express";
import { createContacto, getContacto, getContactoById, deleteContacto } from "../controllers/contactosControllers.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Contacto:
 *       type: object
 *       properties:
 *         nombre_apellido:
 *           type: string
 *           description: Nombre y Apellido del cliente que envía el mensaje
 *         correo:
 *           type: string
 *           description: Correo electrónico del cliente 
 *         asunto: 
 *           type: string
 *           description: Frase clave que caracteriza el mensaje 
 *         mensaje:
 *           type: string
 *           description: Es el mensaje que quiere enviar el cliente
 *         fechaActual:  # Cambiado a 'fechaActual'
 *           type: string
 *           description: Fecha del día en que se envía el mensaje
 *       required:
 *         - nombre_apellido
 *         - correo
 *         - asunto
 *         - mensaje
 *         - fechaActual  # Cambiado a 'fechaActual'
 */

/**
 * @swagger
 * /api/contactos:
 *   post:
 *     summary: Crea un nuevo mensaje de contacto
 *     tags: [Contactos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contacto'
 *     responses:
 *       201:  # Cambiado a 201 para reflejar la creación exitosa
 *         description: Mensaje enviado exitosamente
 */
router.post("/contactos", createContacto);

/**
 * @swagger
 * /api/contactos:
 *   get:
 *     summary: Obtiene todos los mensajes enviados por los clientes
 *     tags: [Contactos]
 *     responses:
 *       200:
 *         description: Lista completa de mensajes enviados 
 *         content:
 *           application/json:
 *             schema: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contacto' 
 */
router.get("/contactos", getContacto);

/**
* @swagger
* /api/contactos/{id}:
*   get:
*     summary: Obtiene el mensaje por ID
*     tags: [Contactos]
*     parameters:
*       - in: path
*         name: id
*         required: true  # Corregido 'requiered' a 'required'
*         schema:
*           type: string
*         description: ID del mensaje
*     responses: 
*       200:
*         description: Información del mensaje específico
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Contacto' 
*/
router.get("/contactos/:id", getContactoById);

/**
* @swagger
* /api/contactos/{id}:
*   delete:
*     summary: Elimina el mensaje por ID
*     tags: [Contactos]
*     parameters:
*       - in: path
*         name: id
*         required: true  # Corregido 'requiered' a 'required'
*         schema:
*           type: string
*         description: ID del mensaje
*     responses: 
*       200:
*         description: Mensaje eliminado exitosamente
*       404:
*         description: Mensaje no encontrado
*/
router.delete("/contactos/:id", deleteContacto);

export default router;
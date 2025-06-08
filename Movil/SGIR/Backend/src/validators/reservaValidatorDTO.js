import Joi from 'joi';

// Esquema de validación para la creación de una reserva
export const createReservaSchema = Joi.object({
  servicio: Joi.string().valid('hotel', 'excursion', 'paquete').required(),
  destinos: Joi.array().items(Joi.string()).min(1).required(),
  hotel: Joi.string().optional(),
  comida: Joi.string().optional(),
  numeroPersonas: Joi.number().integer().min(1).required(),
  precioTotal: Joi.number().min(0).required(),
  fechaReserva: Joi.date().optional()
}).unknown(false);

// Esquema de validación para la actualización de una reserva
export const updateReservaSchema = Joi.object({
  servicio: Joi.string().valid('hotel', 'excursion', 'paquete').optional(),
  destinos: Joi.array().items(Joi.string()).min(1).optional(),
  hotel: Joi.string().optional(),
  comida: Joi.string().optional(),
  numeroPersonas: Joi.number().integer().min(1).optional(),
  precioTotal: Joi.number().min(0).optional(),
  fechaReserva: Joi.date().optional()
})
  .min(1)
  .unknown(false);

// Esquema de validación para obtener una reserva por ID
export const getReservaByIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
}).unknown(false);

// Esquema de validación para la eliminación de una reserva
export const deleteReservaSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
}).unknown(false);

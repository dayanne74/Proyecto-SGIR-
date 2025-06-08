import Joi from 'joi';

// Esquema para crear cliente
const createClienteSchema = Joi.object({
  
  nombre: Joi.string().required(),
  apellido: Joi.string().required(),
  correo: Joi.string().email().required(),
  usuario: Joi.string().required(),
  contrasena: Joi.string().required(),
}).unknown(); // Permite campos desconocidos como __v.

// Esquema para actualizar cliente
const updateClienteSchema = Joi.object({
  
  nombre: Joi.string().required(),
  apellido: Joi.string().required(),
  correo: Joi.string().email().required(),
  usuario: Joi.string().required(),
  contrasena: Joi.string().required(),
}).unknown(); // Permite campos desconocidos como __v.

// Esquema para obtener cliente por ID
const getClienteSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "El campo ID debe ser un ObjectId válido de 24 caracteres hexadecimales.",
      "any.required": "El campo ID es requerido.",
    }),
}).unknown();

// Esquema para eliminar cliente por ID
const deleteClienteSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "El campo ID debe ser un ObjectId válido de 24 caracteres hexadecimales.",
      "any.required": "El campo ID es requerido.",
    }),
}).unknown();

export {
  createClienteSchema,
  updateClienteSchema,
  getClienteSchema,
  deleteClienteSchema,
};
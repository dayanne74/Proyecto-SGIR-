import Joi from "joi";

// Campos base para reusar en create y update
const nombre = Joi.string()
  .min(3)
  .max(90)
  .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/)
  .messages({
    "string.base": "El nombre debe ser un texto",
    "string.empty": "El nombre no puede estar vacío.",
    "string.min": "El nombre debe tener al menos 3 caracteres.",
    "string.max": "El nombre no puede exceder los 90 caracteres.",
    "string.pattern.base": "El nombre solo puede contener letras y espacios.",
    "any.required": "El nombre es un campo requerido",
  });

const ubicacion = Joi.string()
  .min(3)
  .max(90)
  .messages({
    "string.base": "La ubicación debe ser un texto",
    "string.empty": "La ubicación no puede estar vacía.",
    "string.min": "La ubicación debe tener al menos 3 caracteres.",
    "string.max": "La ubicación no puede exceder los 90 caracteres.",
    "any.required": "La ubicación es un campo requerido",
  });

const numeroHabitaciones = Joi.string()
  .pattern(/^\d+\s*habitacion(?:es)?$/i)
  .custom((value, helpers) => {
    const numero = parseInt(value.match(/\d+/)[0], 10);
    if (numero < 1 || numero > 1000) {
      return helpers.message("El número de habitaciones debe ser entre 1 y 1000.");
    }
    return value;
  })
  .messages({
    "string.pattern.base": "El formato debe ser un número seguido de 'habitacion' o 'habitaciones'.",
    "any.required": "El número de habitaciones es requerido.",
  });

const numeroPersonas = Joi.string()
  .pattern(/^\d+\s*personas?$/i)
  .custom((value, helpers) => {
    const numero = parseInt(value.match(/\d+/)[0], 10);
    if (numero < 1 || numero > 1000) {
      return helpers.message("El número de personas debe ser entre 1 y 1000.");
    }
    return value;
  })
  .messages({
    "string.pattern.base": "El formato debe ser un número seguido de 'personas' o 'persona'.",
    "any.required": "El número de personas es requerido.",
  });

const comida = Joi.string()
  .valid("incluida", "no incluida")
  .messages({
    "any.only": "La comida debe ser 'incluida' o 'no incluida'.",
    "any.required": "El campo comida es requerido.",
  });

const precio = Joi.number()
  .precision(2)
  .min(0)
  .messages({
    "number.base": "El precio debe ser un número.",
    "number.min": "El precio no puede ser negativo.",
    "any.required": "El precio es un campo requerido.",
  });

const categoria = Joi.string()
  .valid("baja", "media")
  .messages({
    "any.only": "La categoría debe ser 'baja' o 'media'.",
    "any.required": "El campo categoría es requerido.",
  });

// ID param schema
const id = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .messages({
    "string.pattern.base": "El campo ID debe ser un ObjectId válido de 24 caracteres hexadecimales.",
    "any.required": "El campo ID es requerido.",
  });

// Esquemas
const createHotelSchema = Joi.object({
  nombre: nombre.required(),
  ubicacion: ubicacion.required(),
  numeroHabitaciones: numeroHabitaciones.required(),
  numeroPersonas: numeroPersonas.required(),
  comida: comida.required(),
  precio: precio.required(),
  categoria: categoria.required(),
}).unknown(false);

const updateHotelSchema = Joi.object({
  nombre: nombre.optional(),
  ubicacion: ubicacion.optional(),
  numeroHabitaciones: numeroHabitaciones.optional(),
  numeroPersonas: numeroPersonas.optional(),
  comida: comida.optional(),
  precio: precio.optional(),
  categoria: categoria.optional(),
}).min(1).unknown(false);

const getHotelSchema = Joi.object({ id: id.required() });
const deleteHotelSchema = Joi.object({ id: id.required() });

export { createHotelSchema, updateHotelSchema, getHotelSchema, deleteHotelSchema };

import Joi from "joi";

// Validaciones para cada campo del hotel
const id = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .required()
  .messages({
    "string.pattern.base": "El campo ID debe ser un ObjectId válido de 24 caracteres hexadecimales.",
    "any.required": "El campo ID es requerido.",
  });

const nombre = Joi.string()
  .min(3)
  .max(90)
  .required()
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
  .required()
  .messages({
    "string.base": "La ubicación debe ser un texto",
    "string.empty": "La ubicación no puede estar vacía.",
    "string.min": "La ubicación debe tener al menos 3 caracteres.",
    "string.max": "La ubicación no puede exceder los 90 caracteres.",
    "any.required": "La ubicación es un campo requerido",
  });

  const numeroHabitaciones = Joi.string()
  .pattern(/^\d+\s*habitaciones?$/i) // Permite "10 habitaciones" o "10 habitación"
  .required()
  .custom((value, helpers) => {
    // Extraer el número de la cadena
    const numero = parseInt(value.match(/\d+/)[0], 10);
    if (numero < 1 || numero > 1000) {
      return helpers.message(
        `El número de habitaciones debe ser entre 1 y 1000.`
      );
    }
    return value;
  })
  .messages({
    "string.pattern.base":
      "El formato debe ser un número seguido de 'habitaciones' o 'habitación'.",
    "any.required": "El número de habitaciones es requerido.",
  });

const numeroPersonas = Joi.string()
  .pattern(/^\d+\s*personas?$/i) // Permite "10 personas" o "1 persona"
  .required()
  .custom((value, helpers) => {
    // Extraer el número de la cadena
    const numero = parseInt(value.match(/\d+/)[0], 10);
    if (numero < 1 || numero > 1000) {
      return helpers.message(
        `El número de personas debe ser entre 1 y 1000.`
      );
    }
    return value;
  })
  .messages({
    "string.pattern.base":
      "El formato debe ser un número seguido de 'personas' o 'persona'.",
    "any.required": "El número de personas es requerido.",
  });


const comida = Joi.string()
  .valid("incluida", "no incluida")
  .required()
  .messages({
    "any.only": "La comida debe ser 'incluida' o 'no incluida'.",
    "any.required": "El campo comida es requerido.",
  });

const precio = Joi.number()
  .precision(2)
  .min(0)
  .required()
  .messages({
    "number.base": "El precio debe ser un número.",
    "number.min": "El precio no puede ser negativo.",
    "any.required": "El precio es un campo requerido.",
  });

const categoria = Joi.string()
  .valid("baja", "media")
  .required()
  .messages({
    "any.only": "La categoría debe ser 'baja' o 'media'.",
    "any.required": "El campo categoría es requerido.",
  });

// Esquemas de validación para los métodos de la lógica de hoteles
const createHotelSchema = Joi.object({
  nombre,
  ubicacion,
  numeroHabitaciones,
  numeroPersonas,
  comida,
  precio,
  categoria,
}).unknown(false);

const updateHotelSchema = Joi.object({
  nombre,
  ubicacion,
  numeroHabitaciones,
  numeroPersonas,
  comida,
  precio,
  categoria,
});

const getHotelSchema = Joi.object({
  id,
});

const deleteHotelSchema = Joi.object({
  id,
});

export { createHotelSchema, updateHotelSchema, getHotelSchema, deleteHotelSchema };

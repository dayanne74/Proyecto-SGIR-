
import Joi from "joi";

// Definición del ID
const id = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .required()
  .messages({
    "string.pattern.base": "El campo ID debe ser un ObjectId válido de 24 caracteres hexadecimales.",
    "any.required": "El campo ID es requerido.",
  });

// Definición del destino
const destino = Joi.string()
  .min(3)
  .max(90)
  .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/)
  .required()
  .messages({
    "string.base": "El destino debe ser un texto.",
    "string.empty": "El destino no puede estar vacío.",
    "string.min": "El destino debe tener al menos 3 caracteres.",
    "string.max": "El destino no puede exceder los 90 caracteres.",
    "string.pattern.base": "El destino solo puede contener letras y espacios.",
    "any.required": "El destino es un campo requerido.",
  });

// Definición de la actividad
const actividad = Joi.string()
  .min(3)
  .max(90)
  .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/)
  .required()
  .messages({
    "string.base": "La actividad debe ser un texto.",
    "string.empty": "La actividad no puede estar vacía.",
    "string.min": "La actividad debe tener al menos 3 caracteres.",
    "string.max": "La actividad no puede exceder los 90 caracteres.",
    "string.pattern.base": "La actividad solo puede contener letras y espacios.",
    "any.required": "La actividad es un campo requerido.",
  });

  const descripcion = Joi.string()
  .required()
  .messages({
      "string.base": "La descripcion debe ser un texto.",
      "string.empty": "La descripcion no puede estar vacío.",
      "any.required": "El campo descripcion es requerido.",
  });
// Definición del número de personas
const numeroPersonas = Joi.string()
  .required()
  .messages({
    "string.base": "El numero de personas debe ser un texto.",
    "string.empty": "El numero de personas no puede estar vacía.",
    "any.required": "El campo numero de personas es requerido.",
  });


  const nombre = Joi.string()
  .valid("paquete 1", "paquete 2", "paquete 3", "paquete 4") // Definir valores permitidos
  .required()
  .messages({
    "any.required": "El nombre del paquete es requerido.",
    "any.only": "El nombre del paquete debe ser uno de los siguientes: 'paquete 1', 'paquete 2', 'paquete 3', 'paquete 4'.",
  });

// Definición del precio
const precio = Joi.number()
  .positive()
  .precision(2)
  .required()
  .messages({
    "number.base": "El precio debe ser un número.",
    "number.positive": "El precio debe ser positivo.",
    "any.required": "El precio es un campo requerido.",
  });

// Definición del transporte
const transporte = Joi.string()
  .valid("bus", "avion", "tren", "barco")
  .required()
  .messages({
    "string.base": "El transporte debe ser un texto.",
    "any.required": "El campo transporte es requerido.",
    "any.only": "El transporte debe ser uno de los siguientes: 'bus', 'avion', 'tren', 'barco'."
  });

// Definición de la comida
const comida = Joi.string()
  .valid("todo incluido", "almuerzo incluido", "sin comida")
  .required()
  .messages({
    "string.base": "La comida debe ser un texto.",
    "any.required": "El campo comida es requerido.",
    "any.only": "La comida debe ser 'todo incluido', 'almuerzo incluido' o 'sin comida'."
  });

// Definición de la imagen
const imagen = Joi.string()
  .uri()
  .required()
  .messages({
    "string.base": "La imagen debe ser una URL válida.",
    "string.uri": "La imagen debe ser una URL válida.",
    "any.required": "La imagen es un campo requerido.",
  });

const createPaqueteSchema = Joi.object({
  destino: destino.required(),
  actividad: actividad.required(),
  numeroPersonas: numeroPersonas.required(),
  nombre: nombre.required(),
  precio: precio.required(),
  transporte: transporte.required(),
  comida: comida.required(),
  descripcion: descripcion.required(),
});

const updatePaqueteSchema = Joi.object({
  _id: id.optional(),
  destino: destino.optional(),
  actividad: actividad.optional(),
  numeroPersonas: numeroPersonas.optional(),
  nombre: nombre.optional(),
  precio: precio.optional(),
  transporte: transporte.optional(),
  comida: comida.optional(),
  imagen: imagen.optional(),
  descripcion: descripcion.optional(),
});

// Esquema para obtener un paquete por ID
const getPaqueteSchema = Joi.object({
  id: id.required(),
});

// Esquema para eliminar un paquete
const deletePaqueteSchema = Joi.object({
  id: id.required(),
});

export { createPaqueteSchema, updatePaqueteSchema, getPaqueteSchema, deletePaqueteSchema };

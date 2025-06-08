import Joi from "joi";


const id = Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
        "string.pattern.base": "El campo ID debe ser un ObjectId válido de 24 caracteres hexadecimales.",
        "any.required": "El campo ID es requerido.",
    });

const nombre = Joi.string()
    .required()
    .messages({
        "string.base": "La descripcion debe ser un texto.",
        "string.empty": "La descripcion no puede estar vacío.",
        "any.required": "El campo categoría es requerido.",
    });

const descripcion = Joi.string()
    .required()
    .messages({
        "string.base": "La descripcion debe ser un texto.",
        "string.empty": "La descripcion no puede estar vacío.",
        "any.required": "El campo descripcion es requerido.",
    });

const destino = Joi.string()
    .required()
    .messages({
        "string.base": "El destino debe ser un texto.",
        "string.empty": "El destino no puede estar vacío.",
        "any.required": "El campo destino es requerido.",
    });

const precio = Joi.number()
    .positive()
    .required()
    .messages({
        "number.base": "El precio debe ser un número.",
        "number.positive": "El precio debe ser un número positivo.",
        "any.required": "El campo precio es requerido.",
    });

const duracion = Joi.string()
    .required()
    .messages({
        "string.base": "La duración debe ser un texto.",
        "string.empty": "La duración no puede estar vacía.",
        "any.required": "El campo duración es requerido.",
    });

const transporte = Joi.string()
    .required()
    .messages({
        "string.base": "El transporte debe ser un texto.",
        "string.empty": "El transporte no puede estar vacío.",
        "any.required": "El campo transporte es requerido.",
    });

const comida = Joi.string()
    .required()
    .messages({
        "string.base": "La comida debe ser un texto.",
        "string.empty": "El campo comida no puede estar vacío.",
        "any.required": "El campo comida es requerido.",
    });

const actividad = Joi.string()
    .required()
    .messages({
        "string.base": "La actividad debe ser un texto.",
        "string.empty": "El campo actividad no puede estar vacío.",
        "any.required": "El campo actividad es requerido.",
    });


const createExcursionSchema = Joi.object({
    nombre: nombre.required(),
    descripcion: descripcion.required(),
    destino: destino.required(),
    precio: precio.required(),
    duracion: duracion.required(),
    transporte: transporte.required(),
    comida: comida.required(),
    actividad: actividad.required(),
});

const updateExcursionSchema = Joi.object({
    nombre: nombre.optional(),
    descripcion: descripcion.optional(),
    destino: destino.optional(),
    precio: precio.optional(),
    duracion: duracion.optional(), 
    transporte: transporte.optional(), 
    comida: comida.optional(),
    actividad: actividad.optional(), 
});

const getExcursionSchema = Joi.object({
    id: id.required(), 
});

const deleteExcursionSchema = Joi.object({
    id: id.required(), 
});

export { createExcursionSchema, updateExcursionSchema, getExcursionSchema, deleteExcursionSchema };
import excursionSchema from "../models/excursion.js"; 
import { validatorHandler } from "../middleware/validator.handler.js";
import {createExcursionSchema, updateExcursionSchema, getExcursionSchema, deleteExcursionSchema } from "../validators/excursionesValidators.js"; 


export const createExcursion = [
  validatorHandler(createExcursionSchema, "body"),
  async (req, res) => {
    const excursion = new excursionSchema(req.body);
    await excursion
      .save()
      .then((data) => res.status(201).json(data)) 
      .catch((error) => res.status(500).json({ message: error.message })); 
  },
];


export const getExcursion = async (req, res) => {
  try {
    const data = await excursionSchema.find(); 
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getExcursionById = [
  validatorHandler(getExcursionSchema, "params"),
  async (req, res) => {
    const { id } = req.params;
    try {
      const excursion = await excursionSchema.findById(id);
      if (!excursion) {
        return res.status(404).json({ message: "Excursión no encontrada" });
      }
      res.json(excursion);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];


export const updateExcursion = [
  validatorHandler(getExcursionSchema, "params"),
  validatorHandler(updateExcursionSchema, "body"),
  async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, destino, precio, duracion, transporte, comida, actividad } = req.body;

    try {
      const updateExcursion = await excursionSchema.updateOne({ _id: id }, 
        { $set: { nombre, descripcion, destino, precio, duracion, transporte, comida, actividad } });

      if (updateExcursion.matchedCount === 0) {
        return res.status(404).json({ message: "Excursión no encontrada" });
      }
      if (updateExcursion.modifiedCount === 0) {
        return res.status(400).json({ message: "No se realizaron cambios" });
      }
      res.status(200).json({ message: "Excursión actualizada correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];


export const deleteExcursion = [
  validatorHandler(deleteExcursionSchema, "params"),
  async (req, res) => {
    const { id } = req.params;
    try {
      const result = await excursionSchema.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Excursión no encontrada" });
      }
      res.status(200).json({ message: "Excursión eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];
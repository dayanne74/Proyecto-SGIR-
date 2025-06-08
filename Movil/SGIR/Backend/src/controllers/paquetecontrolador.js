import Paquete from "../models/paquete.js";
import { validatorHandler } from "../middleware/validator.handler.js";
import {
  createPaqueteSchema,
  getPaqueteSchema,
  updatePaqueteSchema,
  deletePaqueteSchema,
} from "../validators/paquetevalidatorDTO.js";

export const createPaquete = [
  validatorHandler(createPaqueteSchema, "body"),
  async (req, res) => {
    try {
      const paquete = new Paquete(req.body);
      const data = await paquete.save();
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

export const getPaquete = async (req, res) => {
  try {
    const data = await Paquete.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updatePaquete = [
  validatorHandler(getPaqueteSchema, "params"),
  validatorHandler(updatePaqueteSchema, "body"),
  async (req, res) => {
    const { id } = req.params;
    const { destino, actividad, descripcion, numeroPersonas, nombre, precio, transporte, comida } = req.body;
    try {
      const paqueteUpdate = await Paquete.findByIdAndUpdate(
        id,
        { destino, actividad, descripcion,numeroPersonas, nombre, precio, transporte, comida },
        { new: true }
      );
      if (!paqueteUpdate) {
        return res.status(404).json({ message: "Paquete no encontrado" });
      }
      res.status(200).json(paqueteUpdate);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

export const deletePaquete = [
  validatorHandler(deletePaqueteSchema, "params"), // Validar el id antes de procesar la eliminación
  async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Paquete.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Paquete no encontrado" });
      }
      res.status(200).json({ message: "Paquete eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

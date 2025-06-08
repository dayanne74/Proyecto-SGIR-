import mongoose from "mongoose";
import Hotel from "../models/hotel.js";
import { validatorHandler } from "../middleware/validator.handler.js";
import {
  createHotelSchema,
  updateHotelSchema,
  getHotelSchema,
  deleteHotelSchema,
} from "../validators/hotelvalidatorDTO.js";

// Crear un hotel
export const createHotel = [
  validatorHandler(createHotelSchema, "body"),
  async (req, res) => {
    try {
      const hotel = new Hotel(req.body);
      const savedHotel = await hotel.save();
      res.status(201).json(savedHotel);
    } catch (error) {
      console.error(error);
      // Validación de Joi u otros errores de validación
      res.status(400).json({ message: 'Error de validación', details: error.message });
    }
  },
];

// Obtener todos los hoteles
export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener un hotel por ID
export const getHotelById = [
  validatorHandler(getHotelSchema, "params"),
  async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Error de validación' });
    }
    try {
      const hotel = await Hotel.findById(id);
      if (!hotel) {
        return res.status(404).json({ message: 'Hotel no encontrado' });
      }
      res.status(200).json(hotel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },
];

// Actualizar un hotel
export const updateHotel = [
  validatorHandler(getHotelSchema, "params"),
  validatorHandler(updateHotelSchema, "body"),
  async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Error de validación' });
    }
    try {
      const hotel = await Hotel.findById(id);
      if (!hotel) {
        return res.status(404).json({ message: 'Hotel no encontrado' });
      }
      const cambios = req.body;
      const hayCambios = Object.keys(cambios).some(
        key => cambios[key] !== hotel[key]
      );
      if (!hayCambios) {
        return res.status(400).json({ message: 'No se realizaron cambios' });
      }
      Object.assign(hotel, cambios);
      await hotel.save();
      res.status(200).json({ message: 'Hotel actualizado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error de validación', details: error.message });
    }
  },
];

// Eliminar un hotel
export const deleteHotel = [
  validatorHandler(deleteHotelSchema, "params"),
  async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Error de validación' });
    }
    try {
      const result = await Hotel.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Hotel no encontrado' });
      }
      res.status(200).json({ message: 'Hotel eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },
];

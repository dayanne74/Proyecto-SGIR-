import Reserva from "../models/reserva.js";

// Obtener todas las reservas
export const obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas", error });
  }
};

// Crear una nueva reserva
export const crearReserva = async (req, res) => {
  try {
    const nuevaReserva = new Reserva(req.body);
    await nuevaReserva.save();
    res.status(201).json({ message: "Reserva guardada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al guardar la reserva", error });
  }
};

// Obtener una reserva por ID
export const obtenerReservaPorId = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la reserva", error });
  }
};

// Eliminar una reserva por ID
export const eliminarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
    res.json({ message: "Reserva eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la reserva", error });
  }
};

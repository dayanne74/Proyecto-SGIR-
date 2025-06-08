import { validatorHandler } from '../middleware/validator.handler.js';
import { 
  createReservaSchema, 
  updateReservaSchema, 
  getReservaByIdSchema, 
  deleteReservaSchema 
} from '../validators/reservaValidatorDTO.js'; 
import Hotel from '../models/hotel.js';
import Paquete from '../models/paquete.js';
import Excursion from '../models/excursion.js';
import Reserva from '../models/reserva.js';
import Cliente from '../models/cliente.js';

// Crear reserva
export const createReserva = [
  validatorHandler(createReservaSchema, 'body'),
  async (req, res) => {
    const { id_cliente } = req.body;

    try {
      const cliente = await Cliente.findById(id_cliente);
      if (!cliente) {
        return res.status(400).json({ error: 'Cliente no válido o no encontrado' });
      }

      const reserva = new Reserva(req.body);
      await reserva.save();
      res.status(201).json(reserva);
    } catch (error) {
      console.error('Error al crear la reserva:', error.message);
      res.status(500).json({ error: 'No se pudo crear la reserva. Inténtalo de nuevo más tarde.' });
    }
  },
];

// Obtener todas las reservas
// Obtener todas las reservas
export const getReserva = async (req, res) => {
  try {
    const reservas = await Reserva.find()
      .populate('id_cliente', 'nombre correo')  // Relacionar con Cliente
      .populate('id_paquete', 'destino actividad precio')  // Relacionar con Paquete
      .populate('id_hotel', 'nombre ubicacion precio')  // Relacionar con Hotel
      .populate('id_excursion', 'nombre');  // Relacionar con Excursion

    if (!reservas) {
      return res.status(404).json({ error: 'No se encontraron reservas' });
    }

    res.json(reservas);  // Si todo está bien, devuelve las reservas
  } catch (error) {
    console.error('Error al obtener reservas:', error.message);
    res.status(500).json({ error: 'No se pudieron obtener las reservas. Inténtalo más tarde.' });
  }
};



// Obtener una reserva por ID
export const getReservaById = [
  validatorHandler(getReservaByIdSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    try {
      const reserva = await Reserva.findById(id)
        .populate('id_cliente', 'nombre correo')
        .populate('id_paquete', 'destino actividad precio')
        .populate('id_hotel', 'nombre ubicacion precio')
        .populate('id_excursion', 'nombre');

      if (!reserva) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }

      res.json(reserva);
    } catch (error) {
      console.error('Error al obtener la reserva:', error.message);
      res.status(500).json({ error: 'No se pudo obtener la reserva. Inténtalo más tarde.' });
    }
  },
];

// Actualizar una reserva
export const updateReserva = [
  validatorHandler(getReservaByIdSchema, 'params'), // Validación de ID
  validatorHandler(updateReservaSchema, 'body'), // Validación del cuerpo
  async (req, res) => {
    const { id } = req.params;
    try {
      const reservaActualizada = await Reserva.findByIdAndUpdate(id, req.body, { new: true });

      if (!reservaActualizada) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }

      res.json({ message: 'Reserva actualizada exitosamente', reserva: reservaActualizada });
    } catch (error) {
      console.error('Error al actualizar la reserva:', error.message);
      res.status(500).json({ error: 'No se pudo actualizar la reserva. Inténtalo más tarde.' });
    }
  },
];

// Eliminar una reserva
export const deleteReserva = [
  validatorHandler(deleteReservaSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    try {
      const reservaEliminada = await Reserva.findByIdAndDelete(id);

      if (!reservaEliminada) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }

      res.json({ message: 'Reserva eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar la reserva:', error.message);
      res.status(500).json({ error: 'No se pudo eliminar la reserva. Inténtalo más tarde.' });
    }
  },
];

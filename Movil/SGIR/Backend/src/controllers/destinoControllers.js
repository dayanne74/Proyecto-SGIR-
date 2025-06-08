import destinoSchema from '../models/destino.js';
import { validatorHandler } from '../middleware/validator.handler.js';
import { createDestinoSchema, getDestinoSchema, deleteDestinoSchema } from '../validators/destinoValidator.js';

export const createDestino = [
    validatorHandler(createDestinoSchema, "body"),
    async (req, res) => {
        try {
            const nuevoDestino = new destinoSchema(req.body);
            const data = await nuevoDestino.save();
            res.status(201).json(data);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
];

export const getDestinos = async (req, res) => {
    try {
        const data = await destinoSchema.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDestinoById = [
    validatorHandler(getDestinoSchema, "params"),
    async (req, res) => {
        const { id } = req.params;
        try {
            const destino = await destinoSchema.findById(id);
            if (!destino) return res.status(404).json({ message: 'Destino no encontrado' });
            res.json(destino);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
];

export const deleteDestino = [
    validatorHandler(deleteDestinoSchema, "params"),
    async (req, res) => {
        const { id } = req.params;
        try {
            const result = await destinoSchema.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Destino no encontrado' });
            }
            res.json({ message: 'Destino eliminado' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
];
 
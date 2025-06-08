import express from 'express';
import { createDestino, getDestinos, getDestinoById, deleteDestino } from '../controllers/destinoControllers.js';

const router = express.Router();

router.post('/destinos', createDestino);
router.get('/destinos', getDestinos);
router.get('/destinos/:id', getDestinoById);
router.delete('/destinos/:id', deleteDestino);

export default router;
 
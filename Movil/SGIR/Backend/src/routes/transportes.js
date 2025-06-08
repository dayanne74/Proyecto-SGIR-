import express from 'express';
import { createTransporte, getTransportes, getTransporteById, deleteTransporte } from '../controllers/transporteControllers.js';

const router = express.Router();

router.post('/transporte', createTransporte);
router.get('/transporte', getTransportes);
router.get('/transporte/:id', getTransporteById);
router.delete('/transporte/:id', deleteTransporte);

export default router;

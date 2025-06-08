import express from 'express';
import { createComida, getComida, getComidaById, deleteComida } from '../controllers/comidaControllers.js'
const router = express.Router();

router.post('/comida', createComida);
router.get('/comida', getComida);
router.get('/comida/:id', getComidaById);
router.delete('/comida/:id', deleteComida);

export default router;
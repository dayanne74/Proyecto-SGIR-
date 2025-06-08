import express from 'express';
import { registrar, login, obtenerPerfil, updateProfile } from '../controllers/authController.js';
import authMiddleware from "../middleware/authMiddleware.js";
import { listarUsuarios } from '../controllers/authController.js';




const router = express.Router();

router.post('/register', registrar);
router.post('/login', login);
router.get('/perfil', authMiddleware, obtenerPerfil);
router.put('/updateProfile',authMiddleware, updateProfile);
router.get('/usuarios', listarUsuarios);
export default router;

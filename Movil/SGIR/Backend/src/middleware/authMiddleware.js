import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js'; // ajusta la ruta si es necesario

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Verifica si el header existe y comienza con 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token no proporcionado o formato incorrecto' });
    }

    const token = authHeader.split(' ')[1];

    // Verificamos el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(decoded.id).select('-contrasena');

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Se agrega el usuario al request
    req.usuario = usuario;
    next();

  } catch (error) {
    console.error('Error en el middleware de autenticación:', error.message);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

export default authMiddleware;

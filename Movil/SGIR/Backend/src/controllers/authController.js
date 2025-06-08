import Usuario from '../models/usuario.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';


dotenv.config();
// Controlador para registrar un nuevo usuario
export const registrar = async (req, res) => {
  const { nombre, apellido, usuario, correo, contrasena, documento, telefono } = req.body;

  try {
    const existeCorreo = await Usuario.findOne({ correo: correo.trim().toLowerCase() });
    if (existeCorreo) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const existeUsuario = await Usuario.findOne({ usuario: usuario.trim() });
    if (existeUsuario) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }

    const salt = await bcrypt.genSalt(10);
    const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);

    const nuevoUsuario = new Usuario({
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      usuario: usuario.trim(),
      correo: correo.trim().toLowerCase(),
      contrasena: contrasenaEncriptada,
      documento: documento.trim(),
      telefono: telefono.trim(),
    });

    await nuevoUsuario.save();
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error en registrar:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Controlador para login (permite usuario o correo)
export const login = async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    const usuarioEncontrado = await Usuario.findOne({
      $or: [
        { usuario: usuario.trim() },
        { correo: usuario.trim().toLowerCase() }
      ]
    });
    if (!usuarioEncontrado) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const passwordValida = await bcrypt.compare(contrasena, usuarioEncontrado.contrasena);
    if (!passwordValida) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: usuarioEncontrado._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Controlador para obtener perfil del usuario autenticado
export const obtenerPerfil = async (req, res) => {
  try {
    const usuarioData = await Usuario.findById(req.usuario._id).select('-contrasena');
    if (!usuarioData) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuarioData);
  } catch (error) {
    console.error('Error en obtenerPerfil:', error);
    res.status(500).json({ message: 'Error al obtener el perfil' });
  }
};

// Controlador para actualizar perfil (incluye cambio de contraseña)
export const updateProfile = async (req, res) => {
  const { contrasenaActual, nuevaContrasena, nuevoNombre, nuevoApellido, nuevoEmail, nuevoDocumento, nuevoTelefono } = req.body;

  try {
    const usuarioData = await Usuario.findById(req.usuario._id);
    if (!usuarioData) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Cambio de contraseña
    if (contrasenaActual && nuevaContrasena) {
      const validPassword = await bcrypt.compare(contrasenaActual, usuarioData.contrasena);
      if (!validPassword) {
        return res.status(400).json({ message: 'Contraseña actual incorrecta' });
      }
      const salt = await bcrypt.genSalt(10);
      usuarioData.contrasena = await bcrypt.hash(nuevaContrasena, salt);
    }

    // Actualización de otros campos
    if (nuevoNombre) usuarioData.nombre = nuevoNombre.trim();
    if (nuevoApellido) usuarioData.apellido = nuevoApellido.trim();
    // Solo actualizar el correo si viene en la petición, de lo contrario conservar el existente
    if (nuevoEmail) usuarioData.correo = nuevoEmail.trim().toLowerCase();
    if (nuevoDocumento) usuarioData.documento = nuevoDocumento.trim();
    if (nuevoTelefono) usuarioData.telefono = nuevoTelefono.trim();

    await usuarioData.save();
    res.status(200).json({ message: 'Perfil actualizado correctamente' });
  } catch (error) {
    console.error('Error en updateProfile:', error);
    res.status(500).json({ message: 'Error al actualizar perfil' });
  }
};

export const listarUsuarios = async (_req, res) => {
  try {
    const usuarios = await Usuario.find().select('-contrasena');
    res.json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

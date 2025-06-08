import Cliente from '../models/cliente.js';  // Aquí importamos el modelo Cliente
import { validatorHandler } from "../middleware/validator.handler.js";
import {
  createClienteSchema, updateClienteSchema, getClienteSchema, deleteClienteSchema
} from "../validators/clientesValidatorsDTO.js";


import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const loginCliente = async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    const cliente = await Cliente.findOne({ usuario });

    if (!cliente) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const passwordMatch = await bcrypt.compare(contrasena, cliente.contrasena);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'contrasena incorrecta' });
    }

    const token = jwt.sign(
      { id: cliente._id, usuario: cliente.usuario },
      'tu_clave_secreta', // reemplaza con process.env.JWT_SECRET en producción
      { expiresIn: '2h' }
    );

    res.json({ message: 'Login exitoso', token, cliente });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const crearcliente = [
  validatorHandler(createClienteSchema, "body"),
  async (req, res) => {
    const cliente = new Cliente(req.body);
    await cliente
      .save()
      .then((data) => res.status(201).json(data))
      .catch((error) => res.status(500).json({ message: error.message }));
  },
];

export const obtenercliente = (req, resp) => {
  Cliente
    .find()
    .then((data) => resp.json(data))
    .catch((error) => resp.json({ message: error.message }));
};

export const consultarcliente = [
  validatorHandler(getClienteSchema, "params"),
  async (req, resp) => {
    const { id } = req.params;
    try {
      const cliente = await Cliente.findById(id);
      if (!cliente) {
        return resp.status(404).json({
          message: "Cliente no encontrado",
        });
      }
      resp.json(cliente);
    } catch (error) {
      resp.status(500).json({
        message: error.message,
      });
    }
  },
];

export const actualizarcliente = [
  validatorHandler(getClienteSchema, "params"),
  validatorHandler(updateClienteSchema, "body"),
  async (req, resp) => {
    const { id } = req.params;
    const {  nombre, apellido, correo, usuario, contrasena } = req.body;

    try {
      const obtenercliente = await Cliente.findById(id);
      if (!obtenercliente) {
        return resp.status(404).json({ message: "Cliente no encontrado" });
      }

      const actualizarcliente = await Cliente.updateOne(
        { _id: id },
        { $set: {  nombre, apellido, correo, usuario, contrasena } }
      );

      if (actualizarcliente.matchedCount === 0) {
        return resp.status(404).json({ message: "Cliente no encontrado" });
      }

      if (actualizarcliente.modifiedCount === 0) {
        return resp.status(400).json({ message: "No se realizaron cambios en el cliente" });
      }

      resp.status(200).json({ message: "Cliente actualizado correctamente" });
    } catch (error) {
      resp.status(500).json({ message: error.message });
    }
  },
];

export const borrarcliente = [
  validatorHandler(deleteClienteSchema, "params"),
  async (req, resp) => {
    const { id } = req.params;
    try {
      const result = await Cliente.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return resp.status(404).json({ message: "Cliente no encontrado" });
      }
      resp.status(200).json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
      resp.status(500).json({ message: error.message });
    }
  },
];
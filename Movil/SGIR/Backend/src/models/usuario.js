import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  usuario: { type: String, required: true, unique: true },
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  documento: { type: String, required: true },
  telefono: { type: String, required: true },
});

export default mongoose.model('Usuario', usuarioSchema);

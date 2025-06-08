import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, required: true },
  usuario: { type: String, required: true },
  contrasena: { type: String, required: true },
}, { versionKey: false }); 


clienteSchema.pre('save', async function (next) {
  if (!this.isModified('contrasena')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.contrasena = await bcrypt.hash(this.contrasena, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Exportar el modelo
export default mongoose.model("Cliente", clienteSchema);


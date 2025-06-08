import mongoose from 'mongoose';

const ReservaSchema = new mongoose.Schema({
  tipoDocumento: { type: String, required: true },
  id_cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true }, // Relación con Cliente
  fechaSalida: { type: Date, required: true },
  fechaRegreso: { type: Date, required: true },
  destino: { type: String, required: true },
  id_hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }, // Relación con Hotel (opcional)
  id_paquete: { type: mongoose.Schema.Types.ObjectId, ref: 'Paquete' }, // Relación con Paquete (opcional)
  id_excursion: { type: mongoose.Schema.Types.ObjectId, ref: 'Excursion' }, // Relación con Excursión (opcional)
  numeroContacto: { type: String, required: true },
  cantidadPersonas: { type: Number, required: true },
  transporte: { type: String, required: true },
  precioTotal: { type: Number, required: true },
});

export default mongoose.model('Reserva', ReservaSchema);


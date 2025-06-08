import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El campo usuario es requerido"]
  },
  servicio: { 
    type: String,
    required: [true, "El campo servicio es requerido"]
    // podrías agregar enum: enum: ['hotel','excursion','paquete']
  },
  destino: { type: String },
  hotel: { type: String },
  comida: { type: String },
  numeroPersonas: { 
    type: Number, 
    required: [true, "El número de personas es requerido"],
    min: [1, "El número de personas debe ser al menos 1"]
  },
  precioTotal: { 
    type: Number, 
    required: [true, "El precio total es requerido"],
    min: [0, "El precio total no puede ser negativo"]
  },
  fechaReserva: { type: Date, default: Date.now }
});

export default mongoose.model("Reserva", reservaSchema);

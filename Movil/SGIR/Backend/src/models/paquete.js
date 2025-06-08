import mongoose from "mongoose";

const PaqueteSchema = new mongoose.Schema({

  destino: { 
    type: String, 
    required: true 
  },
  actividad: { 
     type: String,
     required: true
     },
  descripcion: {
    type: String,
    required: true
  },
  numeroPersonas: {
     type: String, 
     required: true 
    },
    nombre: { 
      type: String, 
      enum: ['paquete 1', 'paquete 2', 'paquete 3', 'paquete 4'],
      required: true
    },
  precio: { 
    type: Number,
     required: true
     },
  transporte:
   { type: String, 
    required: true 
  },
  comida: 
  { type: String,
     required: true 
    },
},
{ versionKey: false  }
);

export default mongoose.model("Paquete", PaqueteSchema);

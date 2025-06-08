import mongoose from "mongoose";

const excursionSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    destino: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    duracion: {
        type: String,
        required: true
    },
    transporte: {
        type: String,
        required: true
    },
    comida: {
        type: String,
        required: true
    },
    actividad: {
        type: String,
        required: true
        
    },

}, { collection: 'excursion' });

// Cambiar 'excursion' por 'Excursion'
export default mongoose.model('Excursion', excursionSchema);

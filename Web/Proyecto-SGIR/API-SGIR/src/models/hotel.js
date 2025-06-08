import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
    nombre: {
         type: String, 
         required: true 
    },
    ubicacion: {
         type: String, 
         required: true 
    },
    numeroHabitaciones: {
         type: String,
         required: true 
    },
    numeroPersonas: {
         type: String, 
         required: true 
    },
    comida: { 
        type: String, 
        required: true 
    },
    precio: { 
        type: Number, 
        required: true 
    },
    categoria: { 
        type: String, 
        enum: ['baja', 'media'], 
        required: true 
     },
     
}, 
{ collection: 'hoteles' }); 

// Cambiar 'hoteles' por 'Hotel'
export default mongoose.model('Hotel', hotelSchema);

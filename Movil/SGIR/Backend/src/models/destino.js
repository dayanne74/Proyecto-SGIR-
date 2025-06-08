import mongoose from 'mongoose';

const destinoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    precioBase: {
        type: Number,
        required: true,
    },
    
}, { timestamps: true });

export default mongoose.model('Destino', destinoSchema);

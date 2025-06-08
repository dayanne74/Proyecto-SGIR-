import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../../src/index.js';
import Hotel from '../../../src/models/hotel.js';

describe('Hotel Integration Tests', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Hotel.deleteMany({});
  });

  describe('CRUD completo de hoteles', () => {
    test('Flujo completo: crear, leer, actualizar y eliminar hotel', async () => {
      const hotelData = {
        nombre: 'Hotel Integración',
        ubicacion: 'Medellín Colombia',
        numeroHabitaciones: '30 habitaciones',
        numeroPersonas: '60 personas',
        comida: 'no incluida',
        precio: 120000,
        categoria: 'baja'
      };

      // 1. Crear hotel
      const createResponse = await request(app)
        .post('/api/hotels')
        .send(hotelData)
        .expect(201);

      const hotelId = createResponse.body._id;
      expect(createResponse.body.nombre).toBe(hotelData.nombre);

      // 2. Leer hotel creado
      const getResponse = await request(app)
        .get(`/api/hotels/${hotelId}`)
        .expect(200);

      expect(getResponse.body._id).toBe(hotelId);
      expect(getResponse.body.nombre).toBe(hotelData.nombre);

      // 3. Actualizar hotel
      const updateData = {
        nombre: 'Hotel Actualizado Integración',
        precio: 180000
      };

      const updateResponse = await request(app)
        .put(`/api/hotels/${hotelId}`)
        .send(updateData)
        .expect(200);

      expect(updateResponse.body.message).toBe('Hotel actualizado correctamente');

      // Verificar actualización
      const updatedHotel = await request(app)
        .get(`/api/hotels/${hotelId}`)
        .expect(200);

      expect(updatedHotel.body.nombre).toBe(updateData.nombre);
      expect(updatedHotel.body.precio).toBe(updateData.precio);

      // 4. Eliminar hotel
      const deleteResponse = await request(app)
        .delete(`/api/hotels/${hotelId}`)
        .expect(200);

      expect(deleteResponse.body.message).toBe('Hotel eliminado correctamente');

      // Verificar eliminación
      await request(app)
        .get(`/api/hotels/${hotelId}`)
        .expect(404);
    });

    test('Debe manejar múltiples hoteles correctamente', async () => {
      const hoteles = [
        {
          nombre: 'Hotel Uno',
          ubicacion: 'Ciudad Uno',
          numeroHabitaciones: '20 habitaciones',
          numeroPersonas: '40 personas',
          comida: 'incluida',
          precio: 100000,
          categoria: 'baja'
        },
        {
          nombre: 'Hotel Dos',
          ubicacion: 'Ciudad Dos',
          numeroHabitaciones: '50 habitaciones',
          numeroPersonas: '100 personas',
          comida: 'no incluida',
          precio: 200000,
          categoria: 'media'
        }
      ];

      // Crear múltiples hoteles
      const createdHotels = [];
      for (const hotel of hoteles) {
        const response = await request(app)
          .post('/api/hotels')
          .send(hotel)
          .expect(201);
        createdHotels.push(response.body);
      }

      // Obtener todos los hoteles
      const getAllResponse = await request(app)
        .get('/api/hotels')
        .expect(200);

      expect(getAllResponse.body).toHaveLength(2);
      expect(getAllResponse.body.map(h => h.nombre)).toContain('Hotel Uno');
      expect(getAllResponse.body.map(h => h.nombre)).toContain('Hotel Dos');

      // Verificar cada hotel individualmente
      for (const hotel of createdHotels) {
        const getResponse = await request(app)
          .get(`/api/hotels/${hotel._id}`)
          .expect(200);

        expect(getResponse.body._id).toBe(hotel._id);
      }
    });
  });
});
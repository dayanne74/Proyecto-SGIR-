import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../../src/index.js';
import Hotel from '../../../src/models/hotel.js';

describe('Hotel API Tests', () => {
  let mongoServer;
  let validHotelData;
  let createdHotelId;

  beforeAll(async () => {
    // Configurar MongoDB en memoria para tests
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
    // Limpiar la base de datos antes de cada test
    await Hotel.deleteMany({});

    // Datos válidos para las pruebas
    validHotelData = {
      nombre: 'Hotel Paradise',
      ubicacion: 'Cartagena, Colombia',
      numeroHabitaciones: '50 habitaciones',
      numeroPersonas: '100 personas',
      comida: 'incluida',
      precio: 150000,
      categoria: 'media',
    };
  });

  describe('POST /api/hotels - createHotel', () => {
    test('Debería crear un hotel con datos válidos', async () => {
      const response = await request(app)
        .post('/api/hotels')
        .send(validHotelData)
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.nombre).toBe(validHotelData.nombre);
      expect(response.body.ubicacion).toBe(validHotelData.ubicacion);
      expect(response.body.precio).toBe(validHotelData.precio);

      createdHotelId = response.body._id;
    });

    test('Debe fallar al crear hotel sin nombre', async () => {
      const invalidData = { ...validHotelData };
      delete invalidData.nombre;

      const response = await request(app)
        .post('/api/hotels')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Error de validación');
      expect(response.body.details).toContain('El nombre es un campo requerido');
    });

    test('Debe fallar al crear hotel con nombre muy corto', async () => {
      const invalidData = { ...validHotelData, nombre: 'Ho' };

      const response = await request(app)
        .post('/api/hotels')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Error de validación');
    });

    test('Debe fallar al crear hotel con categoría inválida', async () => {
      const invalidData = { ...validHotelData, categoria: 'alta' };

      const response = await request(app)
        .post('/api/hotels')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Error de validación');
    });

    test('Debe fallar al crear hotel con precio negativo', async () => {
      const invalidData = { ...validHotelData, precio: -100 };

      const response = await request(app)
        .post('/api/hotels')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Error de validación');
    });

    test('Debe fallar al crear hotel con formato inválido de habitaciones', async () => {
      const invalidData = { ...validHotelData, numeroHabitaciones: 'cincuenta cuartos' };

      const response = await request(app)
        .post('/api/hotels')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Error de validación');
    });
  });

  describe('GET /api/hotels - getHotels', () => {
    test('Debe obtener lista vacía cuando no hay hoteles', async () => {
      const response = await request(app).get('/api/hotels').expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(0);
    });

    test('Debe obtener todos los hoteles existentes', async () => {
      await Hotel.create(validHotelData);
      await Hotel.create({
        ...validHotelData,
        nombre: 'Hotel Segundo',
        ubicacion: 'Bogotá, Colombia',
      });

      const response = await request(app).get('/api/hotels').expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('nombre');
      expect(response.body[1]).toHaveProperty('nombre');
    });
  });

  describe('GET /api/hotels/:id - getHotelById', () => {
    beforeEach(async () => {
      const hotel = await Hotel.create(validHotelData);
      createdHotelId = hotel._id.toString();
    });

    test('Debe obtener un hotel por ID válido', async () => {
      const response = await request(app)
        .get(`/api/hotels/${createdHotelId}`)
        .expect(200);

      expect(response.body).toHaveProperty('_id', createdHotelId);
      expect(response.body.nombre).toBe(validHotelData.nombre);
    });

    test('Debe fallar con ID inválido', async () => {
      const response = await request(app).get('/api/hotels/invalidid').expect(400);

      expect(response.body).toHaveProperty('message', 'Error de validación');
    });

    test('Debe retornar 404 para hotel no existente', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();

      const response = await request(app).get(`/api/hotels/${nonExistentId}`).expect(404);

      expect(response.body).toHaveProperty('message', 'Hotel no encontrado');
    });
  });

  describe('PUT /api/hotels/:id - updateHotel', () => {
    beforeEach(async () => {
      const hotel = await Hotel.create(validHotelData);
      createdHotelId = hotel._id.toString();
    });

    test('Debe actualizar un hotel exitosamente', async () => {
      const updateData = {
        nombre: 'Hotel Actualizado',
        precio: 200000,
        categoria: 'baja',
      };

      const response = await request(app)
        .put(`/api/hotels/${createdHotelId}`)
        .send(updateData)
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Hotel actualizado correctamente');

      const updatedHotel = await Hotel.findById(createdHotelId);
      expect(updatedHotel.nombre).toBe(updateData.nombre);
      expect(updatedHotel.precio).toBe(updateData.precio);
    });

    test('Debe fallar al actualizar con ID inválido', async () => {
      const response = await request(app)
        .put('/api/hotels/invalidid')
        .send({ nombre: 'Nuevo Nombre' })
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Error de validación');
    });

    test('Debe retornar 404 para hotel no existente', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();

      const response = await request(app)
        .put(`/api/hotels/${nonExistentId}`)
        .send({ nombre: 'Nuevo Nombre' })
        .expect(404);

      expect(response.body).toHaveProperty('message', 'Hotel no encontrado');
    });

    test('Debe fallar con datos de actualización inválidos', async () => {
      const invalidUpdateData = {
        precio: -50,
        categoria: 'premium',
      };

      const response = await request(app)
        .put(`/api/hotels/${createdHotelId}`)
        .send(invalidUpdateData)
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Error de validación');
    });

    test('Debe retornar 400 cuando no se realizan cambios', async () => {
      // Actualizar con datos específicos
      await Hotel.findByIdAndUpdate(createdHotelId, {
        nombre: 'Hotel Test',
        precio: 100000,
      });

      // Intentar actualizar con los mismos datos
      const response = await request(app)
        .put(`/api/hotels/${createdHotelId}`)
        .send({
          nombre: 'Hotel Test',
          precio: 100000,
        })
        .expect(400);

      expect(response.body).toHaveProperty('message', 'No se realizaron cambios');
    });
  });

  describe('DELETE /api/hotels/:id - deleteHotel', () => {
    beforeEach(async () => {
      const hotel = await Hotel.create(validHotelData);
      createdHotelId = hotel._id.toString();
    });

    test('Debe eliminar un hotel exitosamente', async () => {
      const response = await request(app)
        .delete(`/api/hotels/${createdHotelId}`)
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Hotel eliminado correctamente');

      const deletedHotel = await Hotel.findById(createdHotelId);
      expect(deletedHotel).toBeNull();
    });

    test('Debe fallar al eliminar con ID inválido', async () => {
      const response = await request(app).delete('/api/hotels/invalidid').expect(400);

      expect(response.body).toHaveProperty('message', 'Error de validación');
    });

    test('Debe retornar 404 para hotel no existente', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();

      const response = await request(app).delete(`/api/hotels/${nonExistentId}`).expect(404);

      expect(response.body).toHaveProperty('message', 'Hotel no encontrado');
    });
  });

  describe('Validaciones de esquema', () => {
    test('Debe aceptar todos los formatos válidos de habitaciones', async () => {
      const testCases = [
        '1 habitacion',
        '10 habitaciones',
        '100 HABITACIONES',
        '50 Habitacion',
      ];

      for (const numeroHabitaciones of testCases) {
        const testData = { ...validHotelData, numeroHabitaciones };
        const response = await request(app).post('/api/hotels').send(testData);

        expect(response.status).toBe(201);
        await Hotel.findByIdAndDelete(response.body._id);
      }
    });

    test('Debe aceptar todos los formatos válidos de personas', async () => {
      const testCases = [
        '1 persona',
        '20 Personas',
        '100 PERSONAS',
        '50 Persona',
      ];

      for (const numeroPersonas of testCases) {
        const testData = { ...validHotelData, numeroPersonas };
        const response = await request(app).post('/api/hotels').send(testData);

        expect(response.status).toBe(201);
        await Hotel.findByIdAndDelete(response.body._id);
      }
    });

    test('Debe aceptar todos los valores válidos de comida', async () => {
      const comidasValidas = ['incluida', 'no incluida'];

      for (const comida of comidasValidas) {
        const testData = { ...validHotelData, comida };
        const response = await request(app).post('/api/hotels').send(testData);

        expect(response.status).toBe(201);
        await Hotel.findByIdAndDelete(response.body._id);
      }
    });
  });
});

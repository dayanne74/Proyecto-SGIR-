import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../../src/index.js';
import Reserva from '../../../src/models/reserva.js';

describe('Reserva API Tests', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Reserva.deleteMany({});
  });

  describe('GET /api/reservas - obtenerReservas', () => {
    test('Debe retornar lista vacía inicialmente', async () => {
      const res = await request(app)
        .get('/api/reservas')
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(0);
    });

    test('Debe retornar todas las reservas existentes', async () => {
      // Crear dos reservas con los campos requeridos
      const userId = new mongoose.Types.ObjectId();
      await Reserva.create({ usuario: userId, servicio: 'hotel', numeroPersonas: 2, precioTotal: 50000 });
      await Reserva.create({ usuario: userId, servicio: 'paquete', numeroPersonas: 4, precioTotal: 200000 });

      const res = await request(app)
        .get('/api/reservas')
        .expect(200);
      expect(res.body).toHaveLength(2);
      expect(res.body[0]).toHaveProperty('servicio');
      expect(res.body[1]).toHaveProperty('precioTotal');
    });
  });

  describe('POST /api/reservas - crearReserva', () => {
    test('Debe crear una nueva reserva con datos válidos', async () => {
      const userId = new mongoose.Types.ObjectId().toString();
      const data = { usuario: userId, servicio: 'excursion', numeroPersonas: 3, precioTotal: 150000 };
      const res = await request(app)
        .post('/api/reservas')
        .send(data)
        .expect(201);
      expect(res.body).toHaveProperty('message', 'Reserva guardada exitosamente');

      const created = await Reserva.findOne({ servicio: 'excursion' });
      expect(created).not.toBeNull();
      expect(created.numeroPersonas).toBe(3);
    });

    test('Debe manejar error al guardar reserva inválida', async () => {
      // Falta 'usuario' y otros campos requeridos
      const res = await request(app)
        .post('/api/reservas')
        .send({ servicio: 'hotel' })
        .expect(500);
      expect(res.body).toHaveProperty('message', 'Error al guardar la reserva');
    });
  });

  describe('GET /api/reservas/:id - obtenerReservaPorId', () => {
    let reservaId;
    let userId;
    beforeEach(async () => {
      userId = new mongoose.Types.ObjectId();
      const r = await Reserva.create({ usuario: userId, servicio: 'hotel', numeroPersonas: 2, precioTotal: 80000 });
      reservaId = r._id.toString();
    });

    test('Debe obtener reserva por ID válido', async () => {
      const res = await request(app)
        .get(`/api/reservas/${reservaId}`)
        .expect(200);
      expect(res.body).toHaveProperty('_id', reservaId);
      expect(res.body.servicio).toBe('hotel');
    });

    test('Debe retornar 404 si no existe la reserva', async () => {
      const nonExistent = new mongoose.Types.ObjectId().toString();
      const res = await request(app)
        .get(`/api/reservas/${nonExistent}`)
        .expect(404);
      expect(res.body).toHaveProperty('message', 'Reserva no encontrada');
    });

    test('Debe manejar error con ID inválido', async () => {
      const res = await request(app)
        .get('/api/reservas/invalidid')
        .expect(500);
      expect(res.body).toHaveProperty('message', 'Error al obtener la reserva');
    });
  });

  describe('DELETE /api/reservas/:id - eliminarReserva', () => {
    let reservaId;
    let userId;
    beforeEach(async () => {
      userId = new mongoose.Types.ObjectId();
      const r = await Reserva.create({ usuario: userId, servicio: 'paquete', numeroPersonas: 5, precioTotal: 250000 });
      reservaId = r._id.toString();
    });

    test('Debe eliminar reserva correctamente', async () => {
      const res = await request(app)
        .delete(`/api/reservas/${reservaId}`)
        .expect(200);
      expect(res.body).toHaveProperty('message', 'Reserva eliminada correctamente');

      const deleted = await Reserva.findById(reservaId);
      expect(deleted).toBeNull();
    });

    test('Debe retornar 404 si no existe la reserva', async () => {
      const nonExistent = new mongoose.Types.ObjectId().toString();
      const res = await request(app)
        .delete(`/api/reservas/${nonExistent}`)
        .expect(404);
      expect(res.body).toHaveProperty('message', 'Reserva no encontrada');
    });

    test('Debe manejar error con ID inválido', async () => {
      const res = await request(app)
        .delete('/api/reservas/invalidid')
        .expect(500);
      expect(res.body).toHaveProperty('message', 'Error al eliminar la reserva');
    });
  });
});

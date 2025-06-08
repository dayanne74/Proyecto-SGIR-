import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import express from 'express';
import bodyParser from 'body-parser';
import reservaRoutes from '../../../src/routes/reservas.js';
import Reserva from '../../../src/models/reserva.js';

describe('Reserva Routes Unit Tests', () => {
  let app;
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);

    app = express();
    app.use(bodyParser.json());
    app.use('/api/reservas', reservaRoutes);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Reserva.deleteMany({});
  });

  test('GET /api/reservas - empty list', async () => {
    const res = await request(app)
      .get('/api/reservas')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(0);
  });

  test('POST /api/reservas - create and GET list', async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const data = { usuario: userId, servicio: 'hotel', numeroPersonas: 2, precioTotal: 100000 };
    const postRes = await request(app)
      .post('/api/reservas')
      .send(data)
      .expect(201);
    expect(postRes.body).toHaveProperty('message', 'Reserva guardada exitosamente');

    const listRes = await request(app)
      .get('/api/reservas')
      .expect(200);
    expect(listRes.body).toHaveLength(1);
    expect(listRes.body[0]).toMatchObject({ servicio: 'hotel', numeroPersonas: 2 });
  });

  test('GET /api/reservas/:id - existing and non-existing', async () => {
    const userId = new mongoose.Types.ObjectId();
    const created = await Reserva.create({ usuario: userId, servicio: 'paquete', numeroPersonas: 3, precioTotal: 150000 });

    const getRes = await request(app)
      .get(`/api/reservas/${created._id}`)
      .expect(200);
    expect(getRes.body).toHaveProperty('_id', created._id.toString());

    // non-existing
    const nonId = new mongoose.Types.ObjectId();
    await request(app)
      .get(`/api/reservas/${nonId}`)
      .expect(404);
  });

  test('DELETE /api/reservas/:id - delete and non-existing', async () => {
    const userId = new mongoose.Types.ObjectId();
    const created = await Reserva.create({ usuario: userId, servicio: 'excursion', numeroPersonas: 4, precioTotal: 200000 });

    const delRes = await request(app)
      .delete(`/api/reservas/${created._id}`)
      .expect(200);
    expect(delRes.body).toHaveProperty('message', 'Reserva eliminada correctamente');

    // confirm removed
    const exists = await Reserva.findById(created._id);
    expect(exists).toBeNull();

    // non-existing
    const nonId = new mongoose.Types.ObjectId();
    await request(app)
      .delete(`/api/reservas/${nonId}`)
      .expect(404);
  });
});

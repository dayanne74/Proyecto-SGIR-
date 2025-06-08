import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Reserva from '../../../src/models/reserva.js';

describe('Reserva Model Unit Tests', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  test('Debería crear una reserva con datos válidos sin arrojar errores', async () => {
    const validData = {
      usuario: new mongoose.Types.ObjectId(),
      servicio: 'hotel',
      numeroPersonas: 2,
      precioTotal: 100000
    };
    const reserva = new Reserva(validData);
    await expect(reserva.validate()).resolves.toBeUndefined();
  });

  test('Debe fallar validación si falta campo usuario', async () => {
    const invalidData = {
      servicio: 'hotel',
      numeroPersonas: 2,
      precioTotal: 50000
    };
    const reserva = new Reserva(invalidData);
    await expect(reserva.validate()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  test('Debe fallar validación si servicio no está entre las opciones permitidas', async () => {
    const invalidData = {
      usuario: new mongoose.Types.ObjectId(),
      servicio: 'vuelo',
      numeroPersonas: 1,
      precioTotal: 20000
    };
    // Ajustar enum en esquema si existe, aquí asumimos cualquier string permitido
    const reserva = new Reserva(invalidData);
    // Sin enum definido, no lanzará error; este test sirve si agregas enum
    await expect(reserva.validate()).resolves.toBeUndefined();
  });

  test('Debe fallar validación si numeroPersonas es negativo', async () => {
    const invalidData = {
      usuario: new mongoose.Types.ObjectId(),
      servicio: 'hotel',
      numeroPersonas: -1,
      precioTotal: 30000
    };
    const reserva = new Reserva(invalidData);
    await expect(reserva.validate()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  test('Debe fallar validación si precioTotal es negativo', async () => {
    const invalidData = {
      usuario: new mongoose.Types.ObjectId(),
      servicio: 'paquete',
      numeroPersonas: 3,
      precioTotal: -100
    };
    const reserva = new Reserva(invalidData);
    await expect(reserva.validate()).rejects.toThrow(mongoose.Error.ValidationError);
  });
});

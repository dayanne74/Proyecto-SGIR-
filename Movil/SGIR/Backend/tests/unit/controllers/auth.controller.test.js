import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../../src/index.js';
import Usuario from '../../../src/models/usuario.js';

describe('Autenticación API Tests', () => {
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
    await Usuario.deleteMany({});
  });

  describe('POST /api/auth/registro', () => {
    test('Debe registrar un nuevo usuario con datos válidos', async () => {
      const res = await request(app)
        .post('/api/autentificaciones/registro')
        .send({
          nombreCompleto: 'Juan Pérez',
          correo: 'juan@example.com',
          contraseña: '123456',
          rol: 'Cliente'
        })
        .expect(201);

      expect(res.body).toHaveProperty('message', 'Usuario registrado exitosamente');
      const user = await Usuario.findOne({ correo: 'juan@example.com' });
      expect(user).not.toBeNull();
      expect(user.nombreCompleto).toBe('Juan Pérez');
    });

    test('Debe devolver error si el correo ya está registrado', async () => {
      await Usuario.create({
        nombreCompleto: 'Juan Pérez',
        correo: 'juan@example.com',
        contraseña: '123456',
        rol: 'Cliente'
      });

      const res = await request(app)
        .post('/api/auth/registro')
        .send({
          nombreCompleto: 'Otro Juan',
          correo: 'juan@example.com',
          contraseña: '654321',
          rol: 'Cliente'
        })
        .expect(400);

      expect(res.body).toHaveProperty('message', 'El correo ya está registrado');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await Usuario.create({
        nombreCompleto: 'Juan Pérez',
        correo: 'juan@example.com',
        contraseña: '123456',
        rol: 'Cliente'
      });
    });

    test('Debe iniciar sesión con credenciales válidas', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          correo: 'juan@example.com',
          contraseña: '123456'
        })
        .expect(200);

      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('usuario');
      expect(res.body.usuario).toHaveProperty('correo', 'juan@example.com');
    });

    test('Debe fallar si la contraseña es incorrecta', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          correo: 'juan@example.com',
          contraseña: 'wrongpass'
        })
        .expect(400);

      expect(res.body).toHaveProperty('message', 'Contraseña incorrecta');
    });

    test('Debe fallar si el correo no existe', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          correo: 'noexiste@example.com',
          contraseña: '123456'
        })
        .expect(404);

      expect(res.body).toHaveProperty('message', 'Correo no registrado');
    });
  });

  describe('GET /api/auth/perfil', () => {
    let token;

    beforeEach(async () => {
      const user = await request(app)
        .post('/api/autentificaciones/registro')
        .send({
          nombreCompleto: 'Juan Pérez',
          correo: 'juan@example.com',
          contraseña: '123456',
          rol: 'Cliente'
        });

      const login = await request(app)
        .post('/api/auth/login')
        .send({
          correo: 'juan@example.com',
          contraseña: '123456'
        });

      token = login.body.token;
    });

    test('Debe obtener el perfil del usuario autenticado', async () => {
      const res = await request(app)
        .get('/api/auths/perfil')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty('correo', 'juan@example.com');
    });

    test('Debe fallar sin token de autenticación', async () => {
      const res = await request(app)
        .get('/api/auth/perfil')
        .expect(401);

      expect(res.body).toHaveProperty('message', 'Token no proporcionado');
    });
  });
});

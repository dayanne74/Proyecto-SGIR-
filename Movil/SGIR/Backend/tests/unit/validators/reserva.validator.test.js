import Joi from 'joi';
import {
  createReservaSchema,
  updateReservaSchema,
  deleteReservaSchema,
  getReservaByIdSchema
} from '../../../src/validators/reservaValidatorDTO.js';

describe('Reserva Validators Unit Tests', () => {
  describe('createReservaSchema', () => {
    test('Valida datos válidos', () => {
      const data = {
        servicio: 'hotel',
        destinos: ['Cartagena'],
        hotel: 'Hotel Test',
        comida: 'incluida',
        numeroPersonas: 2,
        precioTotal: 150000,
        fechaReserva: '2025-06-20'
      };
      const { error, value } = createReservaSchema.validate(data);
      expect(error).toBeUndefined();
      expect(value).toMatchObject({
        servicio: 'hotel',
        destinos: ['Cartagena'],
        numeroPersonas: 2,
        precioTotal: 150000
      });
    });

    test('Falla si falta servicio', () => {
      const data = {
        destinos: ['Cartagena'],
        numeroPersonas: 1,
        precioTotal: 100000
      };
      const { error } = createReservaSchema.validate(data);
      expect(error).toBeInstanceOf(Error);
      expect(error?.details[0].message).toContain('servicio');
    });

    test('Falla si destinos no es array o vacío', () => {
      const bad1 = { servicio: 'paquete', destinos: [], numeroPersonas: 1, precioTotal: 100 };
      const { error: e1 } = createReservaSchema.validate(bad1);
      expect(e1).toBeInstanceOf(Error);

      const bad2 = { servicio: 'paquete', destinos: 'Cartagena', numeroPersonas: 1, precioTotal: 100 };
      const { error: e2 } = createReservaSchema.validate(bad2);
      expect(e2).toBeInstanceOf(Error);
    });

    test('Falla si numeroPersonas es menos de 1', () => {
      const data = { servicio: 'hotel', destinos: ['A'], numeroPersonas: 0, precioTotal: 100 };
      const { error } = createReservaSchema.validate(data);
      expect(error).toBeInstanceOf(Error);
      expect(error?.details[0].message).toContain('numeroPersonas');
    });

    test('Falla si precioTotal es negativo', () => {
      const data = { servicio: 'excursion', destinos: ['B'], numeroPersonas: 2, precioTotal: -10 };
      const { error } = createReservaSchema.validate(data);
      expect(error).toBeInstanceOf(Error);
      expect(error?.details[0].message).toContain('precioTotal');
    });
  });

  describe('updateReservaSchema', () => {
    test('Valida cambios parciales válidos', () => {
      const data = { numeroPersonas: 5 };
      const { error } = updateReservaSchema.validate(data);
      expect(error).toBeUndefined();
    });

    test('Falla si datos vacíos', () => {
      const { error } = updateReservaSchema.validate({});
      expect(error).toBeInstanceOf(Error);
    });

    test('Falla valores inválidos', () => {
      const { error } = updateReservaSchema.validate({ precioTotal: -5 });
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('getReservaByIdSchema', () => {
    test('Valida ID correcto', () => {
      const id = '507f1f77bcf86cd799439011';
      const { error } = getReservaByIdSchema.validate({ id });
      expect(error).toBeUndefined();
    });

    test('Falla ID inválido', () => {
      const { error } = getReservaByIdSchema.validate({ id: '1234' });
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('deleteReservaSchema', () => {
    test('Valida ID correcto', () => {
      const id = '507f191e810c19729de860ea';
      const { error } = deleteReservaSchema.validate({ id });
      expect(error).toBeUndefined();
    });

    test('Falla ID faltante', () => {
      const { error } = deleteReservaSchema.validate({});
      expect(error).toBeInstanceOf(Error);
    });
  });
});

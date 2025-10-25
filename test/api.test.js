const request = require('supertest');

jest.mock('../models/Empleado', () => {
  const store = [];
  let seq = 0;
  const genId = () => String(++seq);

  function Empleado(data) {
    Object.assign(this, data);
    this._id = genId();
  }
  Empleado.prototype.save = jest.fn(async function () {
    if (!this.nombre) {
      const err = new Error('ValidationError');
      err.name = 'ValidationError';
      throw err;
    }
    if (this.identificacion && store.some(x => x.identificacion === this.identificacion)) {
      const err = new Error('duplicate key');
      err.code = 11000;
      err.keyValue = { identificacion: this.identificacion };
      throw err;
    }
    store.push({ ...this });
    return this;
  });

  Empleado.find = jest.fn(async () => store);
  Empleado.findById = jest.fn(async (id) => store.find(x => String(x._id) === String(id)) || null);
  Empleado.findByIdAndUpdate = jest.fn(async (id, update, opts) => {
    const i = store.findIndex(x => String(x._id) === String(id));
    if (i === -1) return null;
    store[i] = { ...store[i], ...(update?.$set || {}) };
    return opts?.new ? store[i] : null;
  });
  Empleado.findByIdAndDelete = jest.fn(async (id) => {
    const i = store.findIndex(x => String(x._id) === String(id));
    if (i === -1) return null;
    return store.splice(i, 1)[0];
  });
  Empleado.__store = store;
  Empleado.__reset = () => { store.length = 0; seq = 0; };

  return Empleado;
});

const app = require('../app');

describe('API /api/empleados (mock)', () => {
  const Empleado = require('../models/Empleado');

  beforeEach(() => Empleado.__reset());

  it('200 lista empleados', async () => {
    await request(app).get('/api/empleados')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });


  it('201 crea un empleado', async () => {
    const res = await request(app).post('/api/empleados')
      .set('Accept', 'application/json')
      .send({
        identificacion: 'ABC001',
        nombre: 'Ana Pérez',
        sueldo: 1200.5,
        cargo: 'Gerente',
        departamento: 'Ventas'
      })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body.nombre).toBe('Ana Pérez');
    expect(res.body._id || res.body.id).toBeDefined();
  });

  it('400 cuando falta nombre', async () => {
    await request(app).post('/api/empleados')
      .set('Accept', 'application/json')
      .send({ sueldo: 1000, cargo: 'Dev', departamento: 'IT' })
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('409 si identificacion ya existe', async () => {
    const nuevo = { identificacion: 'DUP001', nombre: 'Ana', cargo: 'Gerente', departamento: 'Ventas', sueldo: 1200 };
    await request(app).post('/api/empleados').send(nuevo).expect(201);
    await request(app).post('/api/empleados').send(nuevo)
      .expect('Content-Type', /json/)
      .expect(409);
  });
});

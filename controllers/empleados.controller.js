// controllers/empleados.controller.js
const empleadoCtrl = {};
const Empleado = require('../models/Empleado');
const { isValidObjectId } = require('mongoose');

empleadoCtrl.getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find();
    return res.status(200).json(empleados);
  } catch (err) {
    return res.status(500).json({ message: 'Error interno' });
  }
};

empleadoCtrl.getEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Id inválido' });
    }

    const empleado = await Empleado.findById(id);
    if (!empleado) return res.status(404).json({ message: 'Empleado no encontrado' });

    return res.status(200).json(empleado);
  } catch (err) {
    return res.status(500).json({ message: 'Error interno' });
  }
};

empleadoCtrl.createEmpleado = async (req, res) => {
  try {
    const { identificacion, nombre, cargo, departamento, sueldo } = req.body;

    if (!nombre) return res.status(400).json({ message: 'Nombre es requerido' });
    if (!cargo) return res.status(400).json({ message: 'Cargo es requerido' });
    if (!departamento) return res.status(400).json({ message: 'Departamento es requerido' });

    const empleado = new Empleado({ identificacion, nombre, cargo, departamento, sueldo });
    const saved = await empleado.save();

    return res.status(201).json(saved);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Body inválido', errors: err.errors });
    }
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Empleado ya existe', key: err.keyValue });
    }
    return res.status(500).json({ message: 'Error interno' });
  }
};
empleadoCtrl.editEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Id inválido' });
    }

    const data = {
      id: req.body.id,
      nombre: req.body.nombre,
      cargo: req.body.cargo,
      departamento: req.body.departamento,
      sueldo: req.body.sueldo
    };

    const actualizado = await Empleado.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
    if (!actualizado) return res.status(404).json({ message: 'Empleado no encontrado' });

    return res.status(200).json(actualizado);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Body inválido', errors: err.errors });
    }
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Empleado ya existe', key: err.keyValue });
    }
    return res.status(500).json({ message: 'Error interno' });
  }
};

empleadoCtrl.deleteEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Id inválido' });
    }

    const borrado = await Empleado.findByIdAndDelete(id);
    if (!borrado) return res.status(404).json({ message: 'Empleado no encontrado' });

    return res.status(200).json({ status: 'Empleado ha sido removido' });
  } catch (err) {
    return res.status(500).json({ message: 'Error interno' });
  }
};

module.exports = empleadoCtrl;

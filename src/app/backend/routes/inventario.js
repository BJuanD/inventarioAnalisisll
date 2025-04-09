const express = require('express');
const router = express.Router();
const connection = require('../db');

// Función para convertir a formato compatible con MySQL DATETIME
function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  const offset = fecha.getTimezoneOffset();
  fecha.setMinutes(fecha.getMinutes() - offset); // Corrige la zona horaria
  return fecha.toISOString().slice(0, 19).replace('T', ' ');
}

// Obtener productos del inventario
router.get('/', (req, res) => {
  connection.query('SELECT * FROM inventario', (error, results) => {
    if (error) return res.status(500).send(error);
    res.json(results);
  });
});

// Agregar producto al inventario
router.post('/', (req, res) => {
  const {
    nombre, tipo, cantidad, ubicacion,
    estado = 'Disponible', fecha_ingreso, responsable
  } = req.body;

  const fechaFormateada = formatearFecha(fecha_ingreso);

  const query = `
    INSERT INTO inventario 
    (nombre, tipo, cantidad, ubicacion, estado, fecha_ingreso, responsable)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    nombre, tipo, cantidad, ubicacion, estado, fechaFormateada, responsable
  ];

  connection.query(query, values, (error, results) => {
    if (error) return res.status(500).send(error);
    res.json({ message: 'Producto registrado', id: results.insertId });
  });
});

// Actualizar producto del inventario
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {
    nombre, tipo, cantidad, ubicacion,
    estado = 'Disponible', fecha_ingreso, responsable
  } = req.body;

  console.log('Datos recibidos para actualizar:', req.body);

  const fechaFormateada = formatearFecha(fecha_ingreso);

  const query = `
    UPDATE inventario 
    SET nombre = ?, tipo = ?, cantidad = ?, ubicacion = ?, estado = ?, fecha_ingreso = ?, responsable = ?
    WHERE id = ?
  `;

  const values = [
    nombre, tipo, cantidad, ubicacion, estado, fechaFormateada, responsable, id
  ];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error al actualizar en la base de datos:', error);
      return res.status(500).send(error);
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto actualizado correctamente' });
  });
});

module.exports = router;

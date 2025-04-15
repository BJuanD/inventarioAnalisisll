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
    estado = 'Disponible', fecha_ingreso, responsable,
    codigo, descripcion, proveedor
  } = req.body;

  const fechaFormateada = formatearFecha(fecha_ingreso);

  const query = `
    INSERT INTO inventario 
    (nombre, tipo, cantidad, ubicacion, estado, fecha_ingreso, responsable, codigo, descripcion, proveedor)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    nombre, tipo, cantidad, ubicacion, estado, fechaFormateada, responsable, codigo, descripcion, proveedor
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
    estado = 'Disponible', fecha_ingreso, responsable,
    codigo, descripcion, proveedor
  } = req.body;

  console.log('Datos recibidos para actualizar:', req.body);

  const fechaFormateada = formatearFecha(fecha_ingreso);

  const query = `
    UPDATE inventario 
    SET nombre = ?, tipo = ?, cantidad = ?, ubicacion = ?, estado = ?, fecha_ingreso = ?, responsable = ?, codigo = ?, descripcion = ?, proveedor = ?
    WHERE id = ?
  `;

  const values = [
    nombre, tipo, cantidad, ubicacion, estado, fechaFormateada, responsable, codigo, descripcion, proovedor, id
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

// Eliminar un producto del inventario
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM inventario WHERE id = ?';

  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error al eliminar el producto:', error);
      return res.status(500).json({ message: 'Error al eliminar el producto.' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    res.json({ message: 'Producto eliminado correctamente.' });
  });
});


module.exports = router;
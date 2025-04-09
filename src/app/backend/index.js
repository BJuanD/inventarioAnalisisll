const express = require('express');
const cors = require('cors');
const connection = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Usar la ruta del inventario desde routes/inventario.js
const inventarioRoutes = require('./routes/inventario');
app.use('/inventario', inventarioRoutes);

// Ruta base para prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

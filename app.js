// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');


const app = express();
const port = 8100;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Rutas
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const Car = require('./models/car');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
const PORT = 3000;

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27018/chemo_autos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexión a MongoDB exitosa');
}).catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
});

// Middleware para parsear JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// Middleware para seguridad
app.use(helmet());

// Middleware para logs de solicitudes
app.use(morgan('combined'));

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Ruta para servir el index.html por defecto
// Ruta para servir el carrito.html

// Reiniciar el carrito al iniciar el servidor
let carrito = [];

// Endpoint para obtener los productos del carrito
app.get('/carrito', (req, res) => {
    res.json(carrito);
});

// Endpoint para agregar un producto al carrito
app.post('/carrito', (req, res) => {
    const { producto } = req.body;
    if (producto) {
        carrito.push(producto);
        res.status(201).json({ message: 'Producto agregado al carrito', carrito });
    } else {
        res.status(400).json({ message: 'Producto no especificado' });
    }
});

// Endpoint para vaciar el carrito desde el servidor
app.delete('/carrito', (req, res) => {
    carrito = []; // Vaciar el carrito en el servidor
    res.status(200).json({ message: 'El carrito ha sido vaciado' });
});

// Endpoint para manejar la compra de un producto
app.post('/comprar', (req, res) => {
    const { producto } = req.body;
    if (producto) {
        console.log(`Producto comprado: ${producto}`);
        res.status(200).json({ message: `Has comprado el producto: ${producto}` });
    } else {
        res.status(400).json({ message: 'Producto no especificado' });
    }
});

// Endpoint para confirmar la compra y reiniciar el carrito
app.post('/confirmar-compra', (req, res) => {
    const { nombre, correo } = req.body;
    if (!nombre || !correo) {
        return res.status(400).json({ message: 'Nombre y correo son obligatorios' });
    }

    // Generar la factura o procesar la compra aquí
    console.log(`Compra confirmada por ${nombre} (${correo})`);

    // Reiniciar el carrito
    carrito = [];
    res.status(200).json({ message: 'Compra confirmada y carrito reiniciado' });
});

// Endpoint para obtener los modelos de autos desde la base de datos
app.get('/cars', async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        console.error('Error al obtener los autos desde la base de datos:', error);
        res.status(500).json({ message: 'Error al obtener los autos' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

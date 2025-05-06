const express = require('express');
const router = express.Router();

// Controladores
const { obtenerCarrito, agregarAlCarrito, comprarProducto, vaciarCarrito } = require('../controllers/carritoController');

// Rutas para el carrito
router.get('/carrito', obtenerCarrito);
router.post('/carrito', agregarAlCarrito);
router.post('/comprar', comprarProducto);

// Endpoint para vaciar el carrito
router.delete('/carrito', vaciarCarrito);

module.exports = router;
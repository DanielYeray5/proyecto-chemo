// Array para almacenar los productos del carrito
let carrito = [];

// Controlador para obtener los productos del carrito
const obtenerCarrito = (req, res) => {
    res.json(carrito);
};

// Controlador para agregar un producto al carrito
const agregarAlCarrito = (req, res) => {
    const { producto } = req.body;
    if (producto) {
        try {
            carrito.push(producto);
            res.status(201).json({ message: 'Producto agregado al carrito', carrito });
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
            res.status(500).json({ message: 'Error al agregar el producto al carrito' });
        }
    } else {
        res.status(400).json({ message: 'Producto no especificado' });
    }
};

// Controlador para manejar la compra de un producto
const comprarProducto = (req, res) => {
    const { producto } = req.body;
    if (producto) {
        console.log(`Producto comprado: ${producto}`);
        res.status(200).json({ message: `Has comprado el producto: ${producto}` });
    } else {
        res.status(400).json({ message: 'Producto no especificado' });
    }
};

// Controlador para vaciar el carrito
const vaciarCarrito = (req, res) => {
    carrito = []; // Vaciar el carrito
    res.status(200).json({ message: 'El carrito ha sido vaciado' });
};

module.exports = {
    obtenerCarrito,
    agregarAlCarrito,
    comprarProducto,
    vaciarCarrito
};
// Array para almacenar los productos en el carrito
let carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto);
    console.log(`Producto agregado: ${producto}`);
    console.log('Carrito actual:', carrito);
    actualizarCarrito();
}

// Función para conectar los botones de agregar al carrito
function inicializarBotonesCarrito() {
    const botones = document.querySelectorAll('.modelo button');
    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            const producto = boton.parentElement.querySelector('h3').textContent;
            agregarAlCarrito(producto);
        });
    });
}

// Inicializar los botones al cargar la página
document.addEventListener('DOMContentLoaded', inicializarBotonesCarrito);

// Ejemplo de uso: agregar productos al carrito
// Puedes conectar esta función a botones en tu HTML
agregarAlCarrito('Modelo 1');
agregarAlCarrito('Modelo 2');

// Función para mostrar/ocultar el carrito desplegable
function toggleCarrito() {
    const carritoDesplegable = document.getElementById('carrito-desplegable');
    carritoDesplegable.classList.toggle('oculto');
}

// Función para mostrar el carrito al pasar el cursor
function mostrarCarrito() {
    const carritoDesplegable = document.getElementById('carrito-desplegable');
    carritoDesplegable.classList.remove('oculto');
}

// Función para ocultar el carrito cuando se quita el cursor
function ocultarCarrito() {
    const carritoDesplegable = document.getElementById('carrito-desplegable');
    carritoDesplegable.classList.add('oculto');
}

// Modificar la función actualizarCarrito para manejar el caso de carrito vacío
function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';
    if (carrito.length === 0) {
        const item = document.createElement('li');
        item.textContent = 'No hay productos agregados';
        listaCarrito.appendChild(item);
    } else {
        carrito.forEach(producto => {
            const item = document.createElement('li');
            item.textContent = producto;
            listaCarrito.appendChild(item);
        });
    }
}

// Asignar evento al botón de toggle del carrito
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-carrito');
    toggleButton.addEventListener('click', toggleCarrito);
});

// Asignar eventos para mostrar y ocultar el carrito al pasar el cursor
document.addEventListener('DOMContentLoaded', () => {
    const menuCarrito = document.querySelector('.menu-carrito');
    menuCarrito.addEventListener('mouseenter', mostrarCarrito);
    menuCarrito.addEventListener('mouseleave', ocultarCarrito);
});
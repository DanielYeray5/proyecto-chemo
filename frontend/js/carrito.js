// Declarar la variable carrito como un array vacío al inicio del archivo
let carrito = [];

// Asegurarse de que la variable carrito se actualice correctamente al obtener los datos del servidor
function obtenerCarritoDelServidor() {
    fetch('http://localhost:3000/carrito')
        .then(response => response.json())
        .then(data => {
            carrito = data; // Actualizar la variable carrito con los datos del servidor
            actualizarCarritoEnPantalla(carrito);
        })
        .catch(error => {
            console.error('Error al obtener el carrito del servidor:', error);
        });
}

// Función para calcular el total del carrito
function calcularTotal(carrito) {
    return carrito.reduce((total, producto) => total + producto.price, 0);
}

// Modificar la función para manejar casos donde el precio no esté definido
function actualizarCarritoEnPantalla(carrito) {
    const listaCarrito = document.getElementById('carrito-lista');
    const totalCarrito = document.getElementById('carrito-total');
    listaCarrito.innerHTML = '';

    if (carrito.length === 0) {
        const item = document.createElement('li');
        item.textContent = 'No hay productos en el carrito';
        listaCarrito.appendChild(item);
        totalCarrito.textContent = '0';
    } else {
        let total = 0;
        carrito.forEach(producto => {
            const item = document.createElement('li');
            const precio = producto.price || 0; // Manejar casos donde el precio no esté definido
            item.innerHTML = `
                <strong>Modelo:</strong> ${producto.name || 'Desconocido'} <br>
                <strong>Descripción:</strong> ${producto.description || 'Sin descripción'} <br>
                <strong>Precio:</strong> $${precio.toLocaleString('es-MX')} MXN
            `;
            listaCarrito.appendChild(item);
            total += precio;
        });
        totalCarrito.textContent = total.toLocaleString('es-MX');
    }
}

// Llamar a la función para obtener el carrito al cargar la página
document.addEventListener('DOMContentLoaded', obtenerCarritoDelServidor);

// Función para generar una factura
function generarFactura(nombre, correo, carrito, total) {
    const factura = `
        Factura
        -------------------------
        Nombre: ${nombre}
        Correo: ${correo}
        Empresa: Chemo Autos

        Productos:
        ${carrito.map(producto => `- ${producto.name}: $${producto.price.toLocaleString('es-MX')} MXN`).join('\n')}

        Total: $${total.toLocaleString('es-MX')} MXN
        -------------------------
        ¡Gracias por tu compra!
    `;
    console.log(factura);
    alert(factura);
}

// Asegurarse de que el carrito se vacíe correctamente al descargar la factura
function generarArchivoFactura(nombre, correo, carrito, total) {
    const factura = `Factura\n-------------------------\nNombre: ${nombre}\nCorreo: ${correo}\nEmpresa: Chemo Autos\n\nProductos:\n${carrito.map(producto => `- ${producto.name}: $${producto.price.toLocaleString('es-MX')} MXN`).join('\n')}\n\nTotal: $${total.toLocaleString('es-MX')} MXN\n-------------------------\n¡Gracias por tu compra!`;

    const blob = new Blob([factura], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'factura.txt';
    link.textContent = 'Descargar Factura';
    link.classList.add('btn-descargar');

    const graciasDiv = document.getElementById('gracias-compra');
    graciasDiv.innerHTML = '<h2>¡Gracias por tu compra!</h2>';
    graciasDiv.appendChild(link);
    graciasDiv.style.display = 'block';

    document.getElementById('carrito-seccion').style.display = 'none';
    document.getElementById('registro-seccion').style.display = 'none';

    // Vaciar el carrito al hacer clic en el enlace de descarga
    link.addEventListener('click', () => {
        carrito.length = 0; // Vaciar el array del carrito
        actualizarCarritoEnPantalla(carrito);
    });
}

// Verificar si el carrito está vacío antes de confirmar la compra
document.getElementById('confirmar-compra').addEventListener('click', () => {
    if (carrito.length === 0) {
        alert('El carrito está vacío. Agrega productos antes de confirmar la compra.');
        return;
    }

    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;

    if (!nombre || !correo) {
        alert('Por favor, completa el registro con tu nombre y correo antes de confirmar la compra.');
        return;
    }

    const total = carrito.reduce((sum, producto) => sum + producto.price, 0);
    generarArchivoFactura(nombre, correo, carrito, total);

    // Vaciar el carrito
    carrito = [];
    actualizarCarritoEnPantalla(carrito);
});

// Agregar preventDefault al formulario de registro
document.getElementById('form-registro').addEventListener('submit', (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    alert(`Registro exitoso para: ${nombre} (${correo})`);
    // Aquí puedes agregar lógica adicional para enviar los datos al servidor
});

// Modificar el botón "Realizar Otra Compra" para vaciar el carrito en el servidor
document.getElementById('otra-compra').addEventListener('click', () => {
    fetch('http://localhost:3000/carrito', {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo vaciar el carrito en el servidor.');
        }
        return response.json();
    })
    .then(() => {
        carrito = []; // Vaciar el carrito localmente
        actualizarCarritoEnPantalla(carrito); // Actualizar la vista del carrito
        window.location.href = 'modelos.html'; // Redirigir a modelos.html
    })
    .catch(error => {
        console.error('Error al vaciar el carrito:', error);
        alert('Error: No se pudo vaciar el carrito.');
    });
});
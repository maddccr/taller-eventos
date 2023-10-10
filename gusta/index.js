
fetch('./json/productos.json') // Ruta relativa desde script.js al archivo JSON 
.then(response => { if (!response.ok) { throw new Error('No se pudo cargar el archivo JSON.'); } return response.json(); }) 
.then(data => { 

     console.log(data); 
     mostrarProductos(data)
     console.log(agregarProductoAlCarrito(id, data))
    
    }) 
 .catch(error => { console.error('Error en la solicitud fetch', error); }); 


// Función para mostrar los productos en la lista

function mostrarProductos(data) {

    const lista = document.getElementById("lista-productos");
    data.productos_construcción.forEach(producto => {
        lista.innerHTML += `<li onclick="setRelatedProductsId(${producto.id})">
        <button class="agregar" id="icon-carrito"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </svg></button>
        <strong> ${producto.nombre}</strong><br>
        <strong></strong>${producto.descripción}<br>
        <strong>Precio:</strong> $${producto.costo_uyu.toFixed(2)}<br>
        </li>
       `;
    });
}

function setRelatedProductsId(id){
    localStorage.setItem("prodId", id);
  }

const id = localStorage.getItem("prodId");
const carritoDeCompras = [];

function agregarProductoAlCarrito(productoId, data) {
    const productoEncontrado = data.productos_construcción.find(producto => producto.id === productoId);
    if (productoEncontrado) {
      carritoDeCompras.push(productoEncontrado);
      console.log(`${productoEncontrado.nombre} se ha agregado al carrito.`);
    } else {
      console.log(`Producto con ID ${productoId} no encontrado.`);
    }
  }





// Variables para el carrito y la lista de productos
let carrito = [];
const listaProductos = document.getElementById("lista-productos");
const listaCarrito = document.getElementById("lista-carrito");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
const totalCarrito = document.getElementById("total-carrito"); 

// Función para agregar un producto al carrito
function agregarAlCarrito(e) {
    if (e.target.classList.contains("agregar")) {
        const productoSeleccionado = e.target.parentElement;
        const producto = {
            id: productoSeleccionado.getAttribute("producto.nombre"),
            nombre: productoSeleccionado.getAttribute("data-nombre"),
            precio: parseFloat(productoSeleccionado.getAttribute("data-precio"))
        };
        
        carrito.push(producto);
        mostrarCarrito();
    }
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    listaCarrito.innerHTML = "";

    carrito.forEach(producto => {
        const li = document.createElement("li");
        li.textContent = ` ${producto.nombre} - $${producto.precio.toFixed(2)}`;

        // Agrega un botón de eliminación junto al producto en el carrito
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Quitar del carrito";
        botonEliminar.classList.add("eliminar");
        botonEliminar.setAttribute("data-id", producto.id);
        li.appendChild(botonEliminar);

        listaCarrito.appendChild(li);
    });

    // Calcular y mostrar el total del carrito
    const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);

    totalCarrito.textContent = `Total del Carrito: $${total.toFixed(2)}`;

    // Agregar eventos click a los botones de eliminación después de mostrar los productos
    const botonesEliminar = document.querySelectorAll(".eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(e) {
    const productoId = e.target.getAttribute("data-id");

    // Filtrar el carrito para eliminar el producto con el ID correspondiente
    carrito = carrito.filter(producto => producto.id !== productoId);

    mostrarCarrito(); // Actualizar la lista del carrito en la interfaz



    // Calcular y mostrar el total del carrito
    const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
    totalCarrito.textContent = `Total del Carrito: $${total.toFixed(2)}`;
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(e) {
    const productoId = e.target.getAttribute("data-id");

    // Filtrar el carrito para eliminar el producto con el ID correspondiente
    carrito = carrito.filter(producto => producto.id !== productoId);

    mostrarCarrito(); // Actualizar la lista del carrito en la interfaz
}

// Agregar evento click a la lista de productos
listaProductos.addEventListener("click", agregarAlCarrito);

// Agregar evento click al botón "Vaciar Carrito"
vaciarCarritoBtn.addEventListener("click", () => {
    carrito.length = 0;
    mostrarCarrito();
});


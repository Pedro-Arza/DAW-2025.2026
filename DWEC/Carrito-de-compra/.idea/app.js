import { dato } from "./dato.js";
import { Carrito } from "./carrito.js";

// Crear carrito
const carrito = new Carrito();
const contenedorProductos = document.getElementById("productos");
const contenedorCarrito = document.getElementById("carrito");

// Función para mostrar los productos (usada tanto por la API como por los datos locales)
function mostrarProductos(data) {
  contenedorProductos.innerHTML = ""; // Limpia antes de mostrar
  data.forEach(prod => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <h3>${prod.title}</h3>
      <p><b>${prod.price} ${dato.currency}</b></p>
      <button data-sku="${prod.SKU}">Añadir al carrito</button>
    `;
    contenedorProductos.appendChild(div);
  });

  // Escuchar los botones de “Añadir al carrito”
  document.querySelectorAll(".producto button").forEach(boton => {
    boton.addEventListener("click", () => {
      const sku = boton.getAttribute("data-sku");
      carrito.agregarProducto(sku);
      actualizarCarrito();
    });
  });
}

// Función para actualizar el carrito
function actualizarCarrito() {
  const info = carrito.obtenerCarrito();
  contenedorCarrito.innerHTML = "";

  if (info.products.length === 0) {
    contenedorCarrito.innerHTML = "<p>Tu carrito está vacío.</p>";
  } else {
    info.products.forEach(p => {
      const div = document.createElement("div");
      div.className = "item-carrito";
      div.innerHTML = `
        <h4>${p.title}</h4>
        <p>${p.price} € x ${p.quantity}</p>
        <button class="eliminar" data-sku="${p.sku}">Eliminar</button>
      `;
      contenedorCarrito.appendChild(div);
    });

    // Botones de eliminar
    document.querySelectorAll(".eliminar").forEach(btn => {
      btn.addEventListener("click", () => {
        const sku = btn.getAttribute("data-sku");
        carrito.eliminarProducto(sku);
        actualizarCarrito();
      });
    });
  }

  // Actualizar total
  document.getElementById("precioTotal").textContent =
    `${info.total} ${info.currency}`;
}

// Intentar obtener los productos desde la API
fetch('https://68e668cd21dd31f22cc5828d.mockapi.io/Productos/Productos')
  .then(response => {
    if (!response.ok) throw new Error("Respuesta no válida de la API");
    return response.json();
  })
  .then(data => {
    console.log("Productos cargados desde la API:", data);
    mostrarProductos(data);
  })
  .catch(error => {
    console.warn("Error al obtener los productos, usando datos locales:", error);
    mostrarProductos(dato.products); // Respaldo local
  });

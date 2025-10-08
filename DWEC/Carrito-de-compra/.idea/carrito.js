import { dato } from "./dato.js";

class Carrito {
  constructor() {
    this.items = [];
  }

  agregarProducto(sku) {
    const item = this.items.find(p => p.sku === sku);
    if (item) {
      item.quantity++;
    } else {
      this.items.push({ sku, quantity: 1 });
    }
  }

  eliminarProducto(sku) {
    this.items = this.items.filter(p => p.sku !== sku);
  }

  obtenerCarrito() {
    let total = 0;
    let productosCarrito = [];

    this.items.forEach(i => {
      const producto = dato.products.find(p => p.SKU === i.sku);
      if (producto) {
        total += parseFloat(producto.price) * i.quantity;
        productosCarrito.push({
          sku: producto.SKU,
          title: producto.title,
          price: producto.price,
          quantity: i.quantity,
        });
      }
    });

    return {
      total: total.toFixed(2),
      currency: dato.currency,
      products: productosCarrito,
    };
  }
}

export { Carrito };

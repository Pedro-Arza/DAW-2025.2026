//Creacion de la clase carrito

class Carrito {
    #productos;
    constructor(productos) {

        this.#productos = productos.products;
        this.precio = productos.precio;
        this.cantidades = {};
    }

    actualizarUnidades(sku, unidades) {
        if (unidades < 0) unidades = 0;
        this.cantidades[sku] = unidades;
    }

    obtenerInformacionProducto(sku) {

    }

    obtenerCarrito() {
        return this.#productos;
    }

//Creacion de la constante para obtener la informacion del carrito
        const
            data = {
                "precio": "€",
                productslist: [
                    {
                        "SKU": "0K3QOSOV4V",
                        "title": "iFhone 13 Pro",
                        "price": "938.99"
                    },

                    {
                        "SKU": "TGD5XORY1L",
                        "title": "Cargador",
                        "price": "49.99"
                    },

                    {
                        "SKU": "IOKW9BQ9F3",
                        "title": "Funda de piel",
                        "price": "79.99"
                    }
                ]
            }
}



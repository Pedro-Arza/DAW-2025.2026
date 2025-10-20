package com.demo.minitienda.controlers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ProductsController {

    @GetMapping("/products")
    @ResponseBody
    public String listarProductos() {
        return "Producto 1: Smartphone, Producto 2: Laptop, Producto 3: Auriculares, Producto 4: Tablet";
    }
}

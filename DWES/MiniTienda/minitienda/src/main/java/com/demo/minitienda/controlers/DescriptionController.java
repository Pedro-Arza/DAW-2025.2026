package com.demo.minitienda.controlers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class DescriptionController {

    @GetMapping("/description")
    @ResponseBody
    public String mostrarDescripcion() {
        return "MiniTienda es la mejor tienda de productos virtuales.";
    }
}

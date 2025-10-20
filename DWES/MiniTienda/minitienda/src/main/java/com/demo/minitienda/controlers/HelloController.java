package com.demo.minitienda.controlers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloController {

    @GetMapping("/hello")
    @ResponseBody
    public String mostrarSaludo() {
        return "¡Bienvenido a MiniTienda!";
    }
}

package com.example.demo;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controlador que muestra las pistas disponibles en la página principal.
 */
@Controller
public class ControladorListarPistas {

    @GetMapping("/")
    public String mostrarPistas(Model model) {
        List<Pista> pistas = ControladorAñadirPista.getListaPistas();
        model.addAttribute("pistas", pistas);
        return "index"; // Thymeleaf resolverá src/main/resources/templates/index.html
    }
}

package com.example.demo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class NuevapistaControler {

    private final List<String> pistas = new ArrayList<>();

    @GetMapping("/nueva-pista")
    public String mostrarFormulario() {
        return "nuevaPistaForm";
    }

    @PostMapping("/nueva-pista")
    public String agregarPista(@RequestParam("nombrePista") String nombrePista, Model model) {
        pistas.add(nombrePista);
        model.addAttribute("pistas", pistas);
        return "listaPistas";
    }

    @GetMapping("/lista-pistas")
    public String mostrarLista(Model model) {
        model.addAttribute("pistas", pistas);
        return "listaPistas";
    }
}
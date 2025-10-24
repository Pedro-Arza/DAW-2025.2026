package com.example.demo;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Controlador responsable de añadir pistas.
 */
@Controller
public class ControladorAñadirPista {

    // Lista compartida en memoria (simula almacenamiento temporal)
    private static final List<Pista> listaPistas = new CopyOnWriteArrayList<>();

    /**
     * Método POST que procesa el formulario enviado desde index.html y añade una pista.
     * Redirige a la raíz para mostrar la lista actualizada.
     */
    @PostMapping("/addPista")
    public String addPista(@RequestParam("nombrePista") String nombre,
                           @RequestParam("horasDisponibles") String horas) {
        if (nombre == null || nombre.trim().isEmpty()) {
            // podrías manejar errores mejor con BindingResult; aquí simplificamos
            return "redirect:/?error=nombre";
        }
        Pista nueva = new Pista(nombre.trim(), horas != null ? horas.trim() : "");
        listaPistas.add(nueva);
        return "redirect:/";
    }

    // Permite que otros controladores accedan a la lista en memoria
    public static List<Pista> getListaPistas() {
        return listaPistas;
    }
}

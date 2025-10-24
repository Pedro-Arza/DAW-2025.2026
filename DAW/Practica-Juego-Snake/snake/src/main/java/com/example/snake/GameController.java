package com.example.snake;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GameController {

    // Esta será la página principal o el primer juego
    @GetMapping("/")
    public String game1() {
        return "game1"; // Devuelve el archivo game1.html
    }

    // Esta será la segunda página/juego
    @GetMapping("/game2")
    public String game2() {
        return "game2"; // Devuelve el archivo game2.html
    }

    // Esta será la tercera página/juego
    @GetMapping("/game3")
    public String game3() {
        return "game3"; // Devuelve el archivo game3.html
    }
}

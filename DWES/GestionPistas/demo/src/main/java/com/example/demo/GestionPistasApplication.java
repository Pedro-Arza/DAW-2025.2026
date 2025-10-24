package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GestionPistasApplication {

    public static void main(String[] args) {
        SpringApplication.run(GestionPistasApplication.class, args);
        System.out.println("🏓 Aplicación 'Gestión de Pistas de Pádel' iniciada correctamente.");
    }
}

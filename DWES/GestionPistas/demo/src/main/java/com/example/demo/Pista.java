package com.example.demo;

/**
 * Modelo que representa una pista de pádel.
 */
public class Pista {
    private String nombre;
    private String horasDisponibles;

    public Pista() {
    }

    public Pista(String nombre, String horasDisponibles) {
        this.nombre = nombre;
        this.horasDisponibles = horasDisponibles;
    }

    public String getNombre() {
        return nombre;
    }

    public String getHorasDisponibles() {
        return horasDisponibles;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setHorasDisponibles(String horasDisponibles) {
        this.horasDisponibles = horasDisponibles;
    }
}

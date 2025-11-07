package com.example.morosos.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/morosos")
public class MorosoController {

    private final List<Moroso> morosos = new LinkedList<>();
    private final AtomicLong counter = new AtomicLong();

    // Endpoint para obtener todos los morosos
    @GetMapping
    public ResponseEntity<List<Moroso>> getAllMorosos() {
        return new ResponseEntity<>(morosos, HttpStatus.OK);
    }

    // Endpoint para crear un nuevo moroso
    @PostMapping
    public ResponseEntity<Moroso> createMoroso(@RequestBody Moroso newMoroso) {
        // Validación básica
        if (newMoroso.getNombre() == null || ((List<com.example.morosos.controller.Moroso>) newMoroso.getNombre()).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (newMoroso.getImporte() == null || ((Enum<HttpStatus>) newMoroso.getImporte()).compareTo(BigDecimal.ZERO) < 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Asignar ID y guardar en la lista
        newMoroso.setId(counter.incrementAndGet());
        morosos.add(newMoroso);
        return new ResponseEntity<>(newMoroso, HttpStatus.CREATED);
    }

    // Endpoint para eliminar un moroso por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteMoroso(@PathVariable Long id) {
        boolean removed = morosos.removeIf(moroso -> moroso.getId().equals(id));

        if (removed) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

package com.ongconnet.ongconnect.controllers;


import com.ongconnet.ongconnect.entities.Sede;
import com.ongconnet.ongconnect.repositories.SedeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sedes")
// Esto permite que Postman o cualquier Frontend se conecte sin bloqueos de seguridad
@CrossOrigin(origins = "*")
public class SedeController {

    @Autowired
    private SedeRepository sedeRepository;

    // Obtener TODAS las sedes (Tus 6 registros iniciales)
    @GetMapping
    public List<Sede> listarSedes() {
        return sedeRepository.findAll();
    }

    // Crear una NUEVA sede desde Postman
    @PostMapping
    public Sede crearSede(@RequestBody Sede nuevaSede) {
        return sedeRepository.save(nuevaSede);
    }
}
package com.ongconnet.ongconnect.controllers;

import com.ongconnet.ongconnect.entities.Donante;
import com.ongconnet.ongconnect.repositories.DonanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donantes")
public class DonanteController {

    @Autowired
    private DonanteRepository repository;

    @GetMapping
    public List<Donante> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Donante guardar(@RequestBody Donante donante) {
        return repository.save(donante);
    }
}
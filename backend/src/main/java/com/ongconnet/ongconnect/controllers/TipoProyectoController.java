package com.ongconnet.ongconnect.controllers;

import com.ongconnet.ongconnect.entities.TipoProyecto;
import com.ongconnet.ongconnect.repositories.TipoProyectoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tipos-proyecto")
@CrossOrigin(origins = "*") // Para que Angular pueda conectar sin problemas de CORS
public class TipoProyectoController {

    @Autowired
    private TipoProyectoRepository tipoProyectoRepository;

    @GetMapping
    public List<TipoProyecto> obtenerTodos() {
        return tipoProyectoRepository.findAll();
    }
}
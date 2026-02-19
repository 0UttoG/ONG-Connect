package com.ongconnet.ongconnect.controllers;

import com.ongconnet.ongconnect.entities.Proyecto;
import com.ongconnet.ongconnect.entities.VistaProyectoFrontend;
import com.ongconnet.ongconnect.repositories.ProyectoRepository;
import com.ongconnet.ongconnect.services.ProyectoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proyectos")
@CrossOrigin(origins = "*")
public class ProyectoController {

    @Autowired
    private ProyectoRepository proyectoRepository;

    @Autowired
    private ProyectoService proyectoService;

    // =================================================================
    // SECCIÓN 1: VISTA PARA EL DISEÑO (TARJETAS DEL DASHBOARD)
    // =================================================================

    // Este es el que usarás para el diseño de tarjetas que me mostraste
    // URL en Postman: GET http://localhost:8080/api/proyectos/tarjetas
    @GetMapping("/tarjetas")
    public ResponseEntity<List<VistaProyectoFrontend>> listarTarjetas() {
        List<VistaProyectoFrontend> tarjetas = proyectoService.obtenerTarjetasProyectos();
        return ResponseEntity.ok(tarjetas);
    }

    // =================================================================
    // SECCIÓN 2: GESTIÓN ADMINISTRATIVA (LO QUE YA TENÍAS)
    // =================================================================

    // GET: Ver todos los proyectos (datos técnicos completos)
    @GetMapping
    public List<Proyecto> listarProyectos() {
        return proyectoRepository.findAll();
    }

    // POST: Crear un nuevo proyecto
    @PostMapping
    public Proyecto crearProyecto(@RequestBody Proyecto nuevoProyecto) {
        return proyectoRepository.save(nuevoProyecto);
    }

    // PUT: Actualizar estado usando tu Procedimiento Almacenado
    @PutMapping("/{id}/estado")
    public String cambiarEstado(@PathVariable Integer id, @RequestParam String nuevoEstado) {
        proyectoRepository.actualizarEstadoProyecto(id, nuevoEstado);
        return "El estado del proyecto " + id + " ha sido actualizado a: " + nuevoEstado;
    }
}
package com.ongconnet.ongconnect.controllers;

import com.ongconnet.ongconnect.entities.Proyecto;
import com.ongconnet.ongconnect.repositories.ProyectoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proyectos")
@CrossOrigin(origins = "*")
public class ProyectoController {

    @Autowired
    private ProyectoRepository proyectoRepository;

    // GET: Ver todos los proyectos
    @GetMapping
    public List<Proyecto> listarProyectos() {
        return proyectoRepository.findAll();
    }

    // POST: Crear un proyecto
    @PostMapping
    public Proyecto crearProyecto(@RequestBody Proyecto nuevoProyecto) {
        return proyectoRepository.save(nuevoProyecto);
    }

    // PUT: Ejecutar el Procedimiento Almacenado
    // Se usa así en Postman: /api/proyectos/1/estado?nuevoEstado=Finalizado
    @PutMapping("/{id}/estado")
    public String cambiarEstado(@PathVariable Integer id, @RequestParam String nuevoEstado) {
        proyectoRepository.actualizarEstadoProyecto(id, nuevoEstado);
        return "El estado del proyecto " + id + " ha sido actualizado a: " + nuevoEstado + " usando el Procedimiento Almacenado.";
    }
}
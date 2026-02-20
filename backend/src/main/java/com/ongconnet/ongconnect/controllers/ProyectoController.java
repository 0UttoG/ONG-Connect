package com.ongconnet.ongconnect.controllers;

import com.ongconnet.ongconnect.entities.Proyecto;
import com.ongconnet.ongconnect.entities.VistaProyectoFrontend;
import com.ongconnet.ongconnect.repositories.ProyectoRepository;
import com.ongconnet.ongconnect.services.ProyectoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    // GET: Buscar un proyecto por ID para cargar el formulario de edición
    // URL: GET http://localhost:8080/api/proyectos/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Proyecto> obtenerProyectoPorId(@PathVariable Integer id) {
        return proyectoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
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
    @PutMapping("/{id}")
    public ResponseEntity<Proyecto> actualizarProyectoCompleto(@PathVariable Integer id, @RequestBody Proyecto proyectoActualizado) {
        return proyectoRepository.findById(id).map(proyecto -> {
            // Campos básicos
            proyecto.setNombreProyecto(proyectoActualizado.getNombreProyecto());
            proyecto.setDescripcion(proyectoActualizado.getDescripcion());
            proyecto.setMetaFinanciera(proyectoActualizado.getMetaFinanciera());
            proyecto.setEstado(proyectoActualizado.getEstado());

            // NUEVOS CAMPOS (Obligatorios según tu Script SQL)
            proyecto.setFechaInicio(proyectoActualizado.getFechaInicio());
            proyecto.setFechaLimite(proyectoActualizado.getFechaLimite());
            proyecto.setFechaLogroMeta(proyectoActualizado.getFechaLogroMeta());
            proyecto.setPrioridadRiesgo(proyectoActualizado.getPrioridadRiesgo());

            // Relaciones
            if(proyectoActualizado.getIdSede() != null) proyecto.setIdSede(proyectoActualizado.getIdSede());
            if(proyectoActualizado.getIdTipoProyecto() != null) proyecto.setIdTipoProyecto(proyectoActualizado.getIdTipoProyecto());

            return ResponseEntity.ok(proyectoRepository.save(proyecto));
        }).orElse(ResponseEntity.notFound().build());
    }
    // DELETE: Eliminar un proyecto de la base de datos
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarProyectoFisico(@PathVariable Integer id) {
        proyectoRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // =================================================================
    // SECCIÓN 3: DETALLES COMPLETOS (CÁLCULOS MATEMÁTICOS)
    // =================================================================

    @GetMapping("/{id}/detalles")
    public ResponseEntity<Map<String, Object>> obtenerDetallesCompletos(@PathVariable Integer id) {
        // 1. Buscamos los datos base del proyecto (fechas y descripción)
        Proyecto proyecto = proyectoRepository.findById(id).orElse(null);
        if (proyecto == null) {
            return ResponseEntity.notFound().build();
        }

        // 2. Buscamos la vista para obtener el progreso financiero
        VistaProyectoFrontend vista = proyectoService.obtenerTarjetasProyectos().stream()
                .filter(v -> v.getIdProyecto().equals(id))
                .findFirst()
                .orElse(null);

        // 3. Lógica para calcular Días Restantes
        long diasRestantes = 0;
        if (proyecto.getFechaLimite() != null) {
            diasRestantes = java.time.temporal.ChronoUnit.DAYS.between(java.time.LocalDate.now(), proyecto.getFechaLimite());
            if (diasRestantes < 0) diasRestantes = 0; // Si el proyecto ya expiró
        }

        // 4. Lógica para Donantes (Temporalmente simulado hasta que uses DonacionRepository)
        // Aquí deberías inyectar DonacionRepository y hacer algo como: donacionRepository.countByIdProyecto(id);
        long cantidadDonantes = 15; // Reemplazar con count real de BD

        // 5. Construir el paquete de datos perfecto para Angular
        Map<String, Object> respuesta = new java.util.HashMap<>();
        respuesta.put("id", proyecto.getIdProyectos());
        respuesta.put("titulo", vista != null ? vista.getTitulo() : proyecto.getNombreProyecto());
        respuesta.put("categoria", vista != null ? vista.getCategoria() : "General");
        respuesta.put("imagen", vista != null ? vista.getImagenUrl() : proyecto.getTipoImagen());
        respuesta.put("metaMonto", vista != null ? vista.getMeta() : proyecto.getMetaFinanciera());
        respuesta.put("montoRecaudado", vista != null ? vista.getRecaudado() : 0);

        // Datos nuevos:
        respuesta.put("descripcionLarga", proyecto.getDescripcion());
        respuesta.put("diasRestantes", diasRestantes);
        respuesta.put("donantes", cantidadDonantes);

        return ResponseEntity.ok(respuesta);
    }
}
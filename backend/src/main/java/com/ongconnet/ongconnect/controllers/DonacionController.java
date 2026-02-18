package com.ongconnet.ongconnect.controllers;

import com.ongconnet.ongconnect.entities.Donacion;
import com.ongconnet.ongconnect.repositories.DonacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donaciones")
@CrossOrigin(origins = "*")
public class DonacionController {

    @Autowired
    private DonacionRepository donacionRepository;

    // GET: Ver historial de donaciones
    @GetMapping
    public List<Donacion> listarDonaciones() {
        return donacionRepository.findAll();
    }

    // POST: Crear donación usando tu regla de negocio en SQL
    @PostMapping
    public ResponseEntity<String> registrarDonacion(@RequestBody Donacion donacion) {
        try {
            // Llamamos a tu procedimiento en lugar del .save() normal
            donacionRepository.registrarDonacionValidada(
                    donacion.getIdSede(),
                    donacion.getIdDonante(),
                    donacion.getIdTipoDonacion(),
                    donacion.getIdProyecto(),
                    donacion.getCantidad(),
                    donacion.getDescripcion(),
                    donacion.getEstadoComprobante()
            );
            return ResponseEntity.ok("Donación registrada exitosamente y validada por la base de datos.");

        } catch (Exception e) {
            // Si tu procedimiento hace un RAISE EXCEPTION, lo capturamos aquí
            return ResponseEntity.badRequest().body("Error al registrar donación: " + e.getMessage());
        }
    }
}
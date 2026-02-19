package com.ongconnet.ongconnect.controllers;

import com.ongconnet.ongconnect.services.DonacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/donaciones")
@CrossOrigin(origins = "*")
public class DonacionController {

    @Autowired
    private DonacionService donacionService;

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarDonacion(@RequestBody Map<String, Object> payload) {
        try {
            Integer idSede = (Integer) payload.get("idSede");
            Integer idDonante = (Integer) payload.get("idDonante");
            Integer idTipo = (Integer) payload.get("idTipo");
            Integer idProyecto = (Integer) payload.get("idProyecto");

            // Recibimos la cantidad como String desde el JSON y la convertimos seguro a BigDecimal
            BigDecimal cantidad = new BigDecimal(payload.get("cantidad").toString());

            String descripcion = (String) payload.get("descripcion");
            Boolean estadoComprobante = (Boolean) payload.get("estadoComprobante");

            // Llamamos a toda la lógica de validación, PDF y correo
            String resultado = donacionService.procesarDonacion(
                    idSede, idDonante, idTipo, idProyecto, cantidad, descripcion, estadoComprobante
            );

            return ResponseEntity.ok().body(Map.of("mensaje", resultado));

        } catch (Exception e) {
            // Si tu función SQL lanza el error (ej: la donación excede el límite del 1.5 de la meta),
            // el error se captura aquí y Postman muestra un Bad Request
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
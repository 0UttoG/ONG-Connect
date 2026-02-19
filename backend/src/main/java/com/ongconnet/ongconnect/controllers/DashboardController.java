package com.ongconnet.ongconnect.controllers;

import com.ongconnet.ongconnect.entities.VistaBalanceProyecto;
import com.ongconnet.ongconnect.services.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*") // Listo para conectarse con tu frontend
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/balances")
    public ResponseEntity<?> obtenerBalances() {
        try {
            List<VistaBalanceProyecto> balances = dashboardService.obtenerTodosLosBalances();
            return ResponseEntity.ok(balances);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al cargar el dashboard: " + e.getMessage());
        }
    }
}
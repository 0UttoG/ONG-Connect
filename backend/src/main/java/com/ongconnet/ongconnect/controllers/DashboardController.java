package com.ongconnet.ongconnect.controllers;

import com.ongconnet.ongconnect.entities.VistaBalanceProyecto;
import com.ongconnet.ongconnect.services.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
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

    // ENDPOINT 1: Las 4 tarjetas de métricas (KPIs)
    @GetMapping("/estadisticas")
    public ResponseEntity<?> obtenerEstadisticas() {
        try {
            return ResponseEntity.ok(dashboardService.obtenerEstadisticasGlobales());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al cargar estadísticas: " + e.getMessage());
        }
    }

    // ENDPOINT 2: La tabla de últimas donaciones
    @GetMapping("/donaciones-recientes")
    public ResponseEntity<?> obtenerDonacionesRecientes() {
        try {
            return ResponseEntity.ok(dashboardService.obtenerDonacionesRecientes());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al cargar donaciones: " + e.getMessage());
        }
    }
}
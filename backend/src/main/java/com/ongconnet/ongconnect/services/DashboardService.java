package com.ongconnet.ongconnect.services;

import com.ongconnet.ongconnect.entities.VistaBalanceProyecto;
import com.ongconnet.ongconnect.repositories.VistaBalanceProyectoRepository;
import com.ongconnet.ongconnect.repositories.DonacionRepository;
import com.ongconnet.ongconnect.repositories.DonanteRepository;
import com.ongconnet.ongconnect.repositories.ProyectoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private VistaBalanceProyectoRepository dashboardRepository;

    @Autowired
    private DonacionRepository donacionRepository;

    @Autowired
    private DonanteRepository donanteRepository;

    @Autowired
    private ProyectoRepository proyectoRepository;

    public List<VistaBalanceProyecto> obtenerTodosLosBalances() {
        return dashboardRepository.findAll();
    }

    // Método para llenar las 4 tarjetas de la parte superior del Dashboard
    public Map<String, Object> obtenerEstadisticasGlobales() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalRecaudado", donacionRepository.sumarTotalRecaudado());
        stats.put("totalDonantes", donanteRepository.count()); // Cuenta los donantes usando JPA
        stats.put("totalProyectos", proyectoRepository.count()); // Cuenta los proyectos usando JPA
        stats.put("donacionesHoy", donacionRepository.contarDonacionesHoy());
        return stats;
    }

    // Método para llenar la tabla de transacciones recientes
    public List<Map<String, Object>> obtenerDonacionesRecientes() {
        return donacionRepository.obtenerDonacionesRecientes();
    }
}
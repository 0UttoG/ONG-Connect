package com.ongconnet.ongconnect.services;

import com.ongconnet.ongconnect.entities.VistaBalanceProyecto;
import com.ongconnet.ongconnect.repositories.VistaBalanceProyectoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private VistaBalanceProyectoRepository dashboardRepository;

    public List<VistaBalanceProyecto> obtenerTodosLosBalances() {
        // Esto trae todas las filas de tu vista SQL automáticamente
        return dashboardRepository.findAll();
    }
}
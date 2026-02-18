package com.ongconnet.ongconnect.controllers;

import com.ongconnet.ongconnect.entities.VistaBalanceProyecto;
import com.ongconnet.ongconnect.repositories.VistaBalanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private VistaBalanceRepository vistaBalanceRepository;

    // GET: Obtener los balances financieros de todos los proyectos
    @GetMapping("/balances")
    public List<VistaBalanceProyecto> obtenerBalances() {
        return vistaBalanceRepository.findAll();
    }
}
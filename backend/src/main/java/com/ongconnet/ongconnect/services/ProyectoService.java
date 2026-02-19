package com.ongconnet.ongconnect.services;

import com.ongconnet.ongconnect.entities.VistaProyectoFrontend;
import com.ongconnet.ongconnect.repositories.VistaProyectoFrontendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProyectoService {

    @Autowired
    private VistaProyectoFrontendRepository proyectoRepository;

    public List<VistaProyectoFrontend> obtenerTarjetasProyectos() {
        return proyectoRepository.findAll();
    }
}
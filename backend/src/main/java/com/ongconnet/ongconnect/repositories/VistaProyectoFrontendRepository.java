package com.ongconnet.ongconnect.repositories;

import com.ongconnet.ongconnect.entities.VistaProyectoFrontend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VistaProyectoFrontendRepository extends JpaRepository<VistaProyectoFrontend, Integer> {
    // Aquí podrías agregar métodos para filtrar por categoría más adelante
}
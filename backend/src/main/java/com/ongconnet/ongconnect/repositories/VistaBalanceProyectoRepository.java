package com.ongconnet.ongconnect.repositories;

import com.ongconnet.ongconnect.entities.VistaBalanceProyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VistaBalanceProyectoRepository extends JpaRepository<VistaBalanceProyecto, Integer> {
    // No necesitamos escribir consultas SQL aquí.
    // JpaRepository ya nos regala el método findAll() para traer todos los balances.
}
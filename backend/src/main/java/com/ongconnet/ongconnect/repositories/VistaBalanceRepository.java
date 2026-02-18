package com.ongconnet.ongconnect.repositories;

import com.ongconnet.ongconnect.entities.VistaBalanceProyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VistaBalanceRepository extends JpaRepository<VistaBalanceProyecto, Integer> {
    // Listo para traer toda la analítica
}
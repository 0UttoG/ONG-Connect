package com.ongconnet.ongconnect.repositories;

import com.ongconnet.ongconnect.entities.TipoProyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoProyectoRepository extends JpaRepository<TipoProyecto, Integer> {
}
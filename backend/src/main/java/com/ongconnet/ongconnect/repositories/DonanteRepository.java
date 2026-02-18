package com.ongconnet.ongconnect.repositories;

import com.ongconnet.ongconnect.entities.Donante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonanteRepository extends JpaRepository<Donante, Long> {
    // Aquí ya tienes buscar, guardar y borrar listo. ¡Puro fuego!
}
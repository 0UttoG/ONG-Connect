package com.ongconnet.ongconnect.repositories;

import com.ongconnet.ongconnect.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    // Método mágico de Spring que busca un usuario usando su correo
    Optional<Usuario> findByCorreo(String correo);
}
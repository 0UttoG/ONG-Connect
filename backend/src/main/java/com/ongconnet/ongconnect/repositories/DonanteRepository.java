package com.ongconnet.ongconnect.repositories;

import com.ongconnet.ongconnect.entities.Donante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DonanteRepository extends JpaRepository<Donante, Long> {

    // AGREGAMOS ESTA LÍNEA PARA QUE SPRING NO ESPERE RESULTADOS:
    @Modifying

    @Query(value = "CALL public.registrar_donante(" +
            "CAST(:nom AS varchar), " +
            "CAST(:ape AS varchar), " +
            "CAST(:corr AS varchar), " +
            "CAST(:tel AS varchar), " +
            "CAST(:pass AS text), " +
            "CAST(:idRol AS integer))", nativeQuery = true)

    void registrarDonanteDesdeSP(
            @Param("nom") String nombre,
            @Param("ape") String apellido,
            @Param("corr") String correo,
            @Param("tel") String telefono,
            @Param("pass") String password,
            @Param("idRol") Integer idRol
    );
    Optional<Donante> findByCorreo(String correo);
}
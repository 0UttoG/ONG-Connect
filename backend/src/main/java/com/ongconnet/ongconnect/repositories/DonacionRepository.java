package com.ongconnet.ongconnect.repositories;

import com.ongconnet.ongconnect.entities.Donacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;

@Repository
public interface DonacionRepository extends JpaRepository<Donacion, Integer> {

    // Ejecutamos tu procedimiento almacenado sp_validar_donacion_limite
    @Modifying
    @Transactional
    @Query(value = "CALL public.sp_validar_donacion_limite(:idSede, :idDonante, :idTipo, :idProyecto, :cantidad, :descripcion, :estado)", nativeQuery = true)
    void registrarDonacionValidada(
            @Param("idSede") Integer idSede,
            @Param("idDonante") Integer idDonante,
            @Param("idTipo") Integer idTipo,
            @Param("idProyecto") Integer idProyecto,
            @Param("cantidad") BigDecimal cantidad,
            @Param("descripcion") String descripcion,
            @Param("estado") Boolean estado
    );
}
package com.ongconnet.ongconnect.repositories;

import com.ongconnet.ongconnect.entities.Donacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;

@Repository
public interface DonacionRepository extends JpaRepository<Donacion, Integer> {

    // Ahora usamos SELECT public.fn_validar_donacion_limite y devuelve un Integer
    @Query(value = "SELECT public.fn_validar_donacion_limite(:idSede, :idDonante, :idTipo, :idProyecto, :cantidad, :descripcion, :estado)", nativeQuery = true)
    Integer registrarDonacionValidada(
            @Param("idSede") Integer idSede,
            @Param("idDonante") Integer idDonante,
            @Param("idTipo") Integer idTipo,
            @Param("idProyecto") Integer idProyecto,
            @Param("cantidad") BigDecimal cantidad,
            @Param("descripcion") String descripcion,
            @Param("estado") Boolean estado
    );
}
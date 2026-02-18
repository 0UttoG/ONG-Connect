package com.ongconnet.ongconnect.repositories;

import com.ongconnet.ongconnect.entities.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ProyectoRepository extends JpaRepository<Proyecto, Integer> {

    // ¡Llamando a tu Procedimiento Almacenado de Supabase!
    @Modifying
    @Transactional
    @Query(value = "CALL public.sp_actualizar_estado_proyecto(:idProyecto, :nuevoEstado)", nativeQuery = true)
    void actualizarEstadoProyecto(@Param("idProyecto") Integer idProyecto, @Param("nuevoEstado") String nuevoEstado);
}
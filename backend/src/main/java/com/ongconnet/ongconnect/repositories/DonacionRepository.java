package com.ongconnet.ongconnect.repositories;

import com.ongconnet.ongconnect.entities.Donacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

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

    // 1. Suma total del dinero recaudado
    @Query(value = "SELECT COALESCE(SUM(cantidad), 0) FROM public.donacion", nativeQuery = true)
    BigDecimal sumarTotalRecaudado();

    // 2. Conteo de donaciones realizadas el día de hoy
    @Query(value = "SELECT COUNT(*) FROM public.donacion WHERE DATE(fecha_donacion) = CURRENT_DATE", nativeQuery = true)
    Integer contarDonacionesHoy();
    // 3. Obtener las últimas 5 donaciones con el nombre del donante, proyecto y estado del recibo
    @Query(value = "SELECT d.id_donacion AS \"idDonacion\", don.nombre_donante AS \"nombreDonante\", p.nombre_proyecto AS \"nombreProyecto\", d.cantidad AS \"cantidad\", d.fecha_donacion AS \"fechaDonacion\", d.estado_comprobante AS \"estadoRecibo\" " +
            "FROM public.donacion d " +
            "JOIN public.donante don ON d.id_donante = don.id_donante " + // <- CORRECCIÓN AQUÍ
            "JOIN public.proyectos p ON d.id_proyecto = p.id_proyectos " +
            "ORDER BY d.fecha_donacion DESC LIMIT 5", nativeQuery = true)
    List<Map<String, Object>> obtenerDonacionesRecientes();
}
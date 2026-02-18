package com.ongconnet.ongconnect.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "proyectos")
@Data
public class Proyecto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_proyectos")
    private Integer idProyectos;

    @Column(name = "nombre_proyecto")
    private String nombreProyecto;

    private String descripcion;

    @Column(name = "fecha_inicio")
    private LocalDate fechaInicio;

    @Column(name = "fecha_logro_meta")
    private LocalDate fechaLogroMeta;

    private String estado;

    @Column(name = "meta_financiera")
    private BigDecimal metaFinanciera;

    @Column(name = "tipo_imagen")
    private String tipoImagen;

    @Column(name = "prioridad_riesgo")
    private Integer prioridadRiesgo;

    @Column(name = "fecha_limite")
    private LocalDate fechaLimite;

    @Column(name = "id_tipo_proyecto")
    private Integer idTipoProyecto;

    @Column(name = "id_sede")
    private Integer idSede;
}
package com.ongconnet.ongconnect.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "vista_proyectos_frontend")
@Data
public class VistaProyectoFrontend {

    @Id
    @Column(name = "id_proyecto")
    private Integer idProyecto;

    private String categoria;

    private String titulo;

    @Column(name = "imagen_url")
    private String imagenUrl;

    private BigDecimal meta;

    private BigDecimal recaudado;

    private Integer porcentaje;
}
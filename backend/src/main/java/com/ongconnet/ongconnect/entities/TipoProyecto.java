package com.ongconnet.ongconnect.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
// Cambia "tipos_proyecto" por "tipo_proyecto"
@Table(name = "tipo_proyecto", schema = "public")
@Data
public class TipoProyecto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipo_proyecto")
    private Integer idTipoProyecto;

    @Column(name = "nombre_tipo", nullable = false)
    private String nombreTipo;
}
package com.ongconnet.ongconnect.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "donacion")
@Data
public class Donacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_donacion")
    private Integer idDonacion;

    @Column(name = "id_sede")
    private Integer idSede;

    @Column(name = "id_donante")
    private Integer idDonante;

    @Column(name = "id_tipo_donacion")
    private Integer idTipoDonacion;

    @Column(name = "id_proyecto")
    private Integer idProyecto;

    private BigDecimal cantidad;

    @Column(name = "fecha_donacion", insertable = false, updatable = false)
    private LocalDateTime fechaDonacion;

    private String descripcion;

    @Column(name = "estado_comprobante")
    private Boolean estadoComprobante;
}
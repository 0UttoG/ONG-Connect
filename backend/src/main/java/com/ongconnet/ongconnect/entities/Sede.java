package com.ongconnet.ongconnect.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "sedes")
@Data
public class Sede {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sede")
    private Integer idSede; // Usamos Integer porque en SQL es "serial"

    @Column(name = "nombre_sede")
    private String nombreSede;

    private String direccion;

    @Column(name = "estado_sede")
    private String estadoSede;

    private String contacto;
}
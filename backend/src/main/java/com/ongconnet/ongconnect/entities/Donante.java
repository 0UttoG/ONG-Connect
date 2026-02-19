package com.ongconnet.ongconnect.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "donantes") // Debe coincidir exacto con Supabase
@Data
public class Donante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_donante")
    private Long idDonante;

    private String nombre;
    private String apellido;
    private String correo;
    private String telefono;

    // AHORA ESTO YA NO TE MARCARÁ ERROR:
    @OneToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;


    @Column(name = "fecha_registro", insertable = false, updatable = false)
    private LocalDateTime fechaRegistro;
}
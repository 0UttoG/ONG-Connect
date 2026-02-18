package com.ongconnet.ongconnect.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.Immutable;
import java.math.BigDecimal;

@Entity
@Table(name = "vista_balance_proyectos")
@Immutable // Indica que esta tabla es una vista (solo lectura)
@Data
public class VistaBalanceProyecto {

    @Id // Usamos el ID del proyecto como llave primaria virtual
    @Column(name = "id_proyectos")
    private Integer idProyectos;

    @Column(name = "nombre_proyecto")
    private String nombreProyecto;

    @Column(name = "meta_financiera")
    private BigDecimal metaFinanciera;

    @Column(name = "total_recaudado")
    private BigDecimal totalRecaudado;

    @Column(name = "total_gastado")
    private BigDecimal totalGastado;

    @Column(name = "saldo_disponible")
    private BigDecimal saldoDisponible;

    @Column(name = "porcentaje_avance")
    private BigDecimal porcentajeAvance;
}
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
  
  // Variables que se llenarán con los datos reales de Java
  kpis = {
    totalRecaudado: 0,
    donantesActivos: 0,
    proyectosActivos: 0,
    donacionesHoy: 0
  };

  donacionesRecientes: any[] = [];

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef // El Despertador para evitar los 2 clics
  ) {}

  ngOnInit(): void {
    this.cargarDatosReales();
  }

  cargarDatosReales() {
    // 1. CARGAR NÚMEROS GRANDES (KPIs)
    this.adminService.getEstadisticasGlobales().subscribe({
      next: (data) => {
        this.kpis.totalRecaudado = data.totalRecaudado || 0;
        this.kpis.donantesActivos = data.totalDonantes || 0;
        this.kpis.proyectosActivos = data.totalProyectos || 0;
        this.kpis.donacionesHoy = data.donacionesHoy || 0;
        this.cdr.detectChanges();
      },
      error: (err) => console.log("Aún cargando endpoints de estadísticas...")
    });

    // 2. CARGAR TABLA DE DONACIONES RECIENTES
    this.adminService.getDonacionesRecientes().subscribe({
      next: (data: any[]) => {
        this.donacionesRecientes = data.map((d: any) => ({
          id: 'TRX-' + d.idDonacion, 
          donante: d.nombreDonante || 'Anónimo', 
          proyecto: d.nombreProyecto || 'Fondo General', 
          monto: d.cantidad,         
          fecha: d.fechaDonacion,    
          estado: 'Completado'       
        }));
        this.cdr.detectChanges();
      },
      error: (err) => console.log("Aún cargando endpoint de donaciones...")
    });
  }
}
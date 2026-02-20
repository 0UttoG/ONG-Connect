import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
  
  kpis = {
    totalRecaudado: 0,
    donantesActivos: 0,
    proyectosActivos: 0,
    donacionesHoy: 0
  };

  // ¡CORRECCIÓN AQUÍ! El nombre vuelve a ser recentDonations para coincidir con el HTML
  recentDonations: any[] = [];

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cargarDatosReales();
    }
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
      error: (err) => {
        console.error("❌ Error real en estadísticas:", err);
      }
    });

    // 2. CARGAR TABLA DE DONACIONES RECIENTES
    this.adminService.getDonacionesRecientes().subscribe({
      next: (data: any[]) => {
        // Asignamos directamente la respuesta del backend
        this.recentDonations = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("❌ Error real en la tabla de donaciones:", err);
      }
    });
  }
}
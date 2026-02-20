import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReporteService } from '../../services/reporte.service';

@Component({
  selector: 'app-admin-reportes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-reportes.html',
  styleUrl: './admin-reportes.css'
})
export class AdminReportes implements OnInit {
  
  // Variables estáticas temporales (simulando Figma) hasta que Nestor conecte el endpoint
  kpis = {
    totalRecaudado: 242000,
    proyectosActivos: 5,
    sucursales: 4,
    promedioDonacion: 833
  };

  categorias = [
    { nombre: 'Educación', porcentaje: 35, monto: 75000, color: 'bg-teal-600' },
    { nombre: 'Salud', porcentaje: 30, monto: 117000, color: 'bg-green-600' },
    { nombre: 'Alimentación', porcentaje: 20, monto: 45000, color: 'bg-green-400' },
    { nombre: 'Medio Ambiente', porcentaje: 15, monto: 28500, color: 'bg-cyan-400' }
  ];

  constructor(
    private reporteService: ReporteService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Cuando Nestor tenga el endpoint, descomentaremos esto:
    /*
    this.reporteService.getDatosReporte().subscribe(data => {
      this.kpis = data.kpis;
      this.categorias = data.categorias;
      this.cdr.detectChanges();
    });
    */
  }

  exportarPDF() {
    alert("Generando PDF desde el servidor de Spring Boot...");
    // this.reporteService.descargarPDF();
  }

  exportarExcel() {
    alert("Generando Excel...");
    // this.reporteService.descargarExcel();
  }
}
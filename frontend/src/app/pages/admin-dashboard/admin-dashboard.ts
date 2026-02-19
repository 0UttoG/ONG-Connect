import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {
  // Estadísticas Globales
  kpis = {
    totalRecaudado: 45250,
    donantesActivos: 1204,
    proyectosActivos: 9,
    donacionesHoy: 18
  };

  // Últimas transacciones en tiempo real (Simuladas)
  donacionesRecientes = [
    { id: 'TRX-9921', donante: 'Ana López', proyecto: 'Refugio Animal La Esperanza', monto: 50, fecha: 'Hace 5 min', estado: 'Completado' },
    { id: 'TRX-9920', donante: 'Carlos Ruiz', proyecto: 'Agua Limpia para Todos', monto: 100, fecha: 'Hace 12 min', estado: 'Completado' },
    { id: 'TRX-9919', donante: 'Usuario Anónimo', proyecto: 'Comedores Infantiles', monto: 25, fecha: 'Hace 1 hora', estado: 'Completado' },
    { id: 'TRX-9918', donante: 'Marta G.', proyecto: 'Educación Digital Rural', monto: 10, fecha: 'Hace 3 horas', estado: 'Procesando' },
    { id: 'TRX-9917', donante: 'Leonardo P.', proyecto: 'Becas Universitarias', monto: 200, fecha: 'Hace 5 horas', estado: 'Completado' }
  ];
}
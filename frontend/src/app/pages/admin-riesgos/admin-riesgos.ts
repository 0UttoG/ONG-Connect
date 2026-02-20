import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-riesgos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-riesgos.html',
  styleUrl: './admin-riesgos.css'
})
export class AdminRiesgos implements OnInit {
  
  // Datos simulados para el análisis de riesgo
  nivelRiesgoGlobal = 'Medio';
  
  alertas = [
    { tipo: 'critico', mensaje: 'Dependencia financiera: El 65% de las donaciones provienen de solo 3 donantes.', impacto: 'Alto' },
    { tipo: 'advertencia', mensaje: 'El proyecto "Agua Limpia" ha consumido el 90% de su presupuesto pero reporta poco avance.', impacto: 'Medio' },
    { tipo: 'info', mensaje: 'Disminución del 12% en la retención de donantes recurrentes este trimestre.', impacto: 'Bajo' }
  ];

  proyectosEnRiesgo = [
    { nombre: 'Agua Limpia', riesgo: 'Alto', motivo: 'Falta de fondos', progreso: 45, presupuestoUsado: 90 },
    { nombre: 'Reforestación', riesgo: 'Medio', motivo: 'Retraso de personal', progreso: 20, presupuestoUsado: 35 }
  ];

  constructor() {}

  ngOnInit(): void {}
}
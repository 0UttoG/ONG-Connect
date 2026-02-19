import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // <--- 1. IMPORTAR HERRAMIENTA DE RUTAS

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterLink], // <--- 2. AGREGARLA AQUÍ
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})
export class ProjectCard {
  @Input() id: number = 0;
  @Input() titulo: string = '';
  @Input() descripcion: string = '';
  @Input() metaMonto: number = 0;
  @Input() montoRecaudado: number = 0;
  @Input() imagen: string = '';

  get porcentaje(): number {
    if (this.metaMonto <= 0) return 0;
    return Math.min((this.montoRecaudado / this.metaMonto) * 100, 100);
  }
}
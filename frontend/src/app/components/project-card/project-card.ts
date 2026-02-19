import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})
export class ProjectCard {
  // Recibe los datos desde el Home
  @Input() titulo: string = '';
  @Input() descripcion: string = '';
  @Input() metaMonto: number = 0;
  @Input() montoRecaudado: number = 0;
  @Input() imagen: string = '';

  // CÁLCULO AUTOMÁTICO DEL PORCENTAJE
  get porcentaje(): number {
    if (this.metaMonto <= 0) return 0;
    return Math.min((this.montoRecaudado / this.metaMonto) * 100, 100);
  }
}
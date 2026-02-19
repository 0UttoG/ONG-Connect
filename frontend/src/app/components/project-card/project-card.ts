import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // <--- IMPORTANTE

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterLink], // <--- AGREGADO AQUÍ
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})
export class ProjectCard {
  // VARIABLES DE ENTRADA
  @Input() titulo: string = 'Proyecto sin título';
  @Input() imagenUrl: string = 'https://via.placeholder.com/400x200'; 
  @Input() categoria: string = 'General';
  @Input() montoRecaudado: number = 0;
  @Input() metaMonto: number = 0;

  // CÁLCULO AUTOMÁTICO DEL PORCENTAJE
  get porcentaje(): number {
    if (this.metaMonto <= 0) return 0;
    return Math.min((this.montoRecaudado / this.metaMonto) * 100, 100);
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  // DATOS DEL USUARIO (Simulados por ahora)
  usuario = {
    nombre: 'William Morales',
    correo: 'william@ejemplo.com',
    fechaRegistro: '18/02/2026',
    foto: '/images/William.jpeg' // Usamos tu foto de ejemplo
  };

  // HISTORIAL DE DONACIONES
  donaciones = [
    { id: '#1023', fecha: '15 Feb 2026', proyecto: 'Educación Digital Rural', monto: 25, estado: 'Completado' },
    { id: '#1010', fecha: '02 Ene 2026', proyecto: 'Agua Limpia para Todos', monto: 50, estado: 'Completado' },
    { id: '#0998', fecha: '20 Dic 2025', proyecto: 'Reforestacion El Imposible', monto: 10, estado: 'Completado' }
  ];

  // Calcular total donado
  get totalDonado() {
    return this.donaciones.reduce((acc, curr) => acc + curr.monto, 0);
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  equipo = [
    {
      nombre: 'Nestor Stuardo Uto Gamero',
      cargo: 'Presidente & Director Ejecutivo',
      foto: '/images/Uto.png' // <--- Solo /images/...
    },
    {
      nombre: 'William Ademir Morales Linares',
      cargo: 'Director de Operaciones',
      foto: '/images/William.jpeg' // <--- Solo /images/...
    }
  ];
}
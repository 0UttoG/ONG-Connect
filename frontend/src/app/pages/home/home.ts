import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { ProjectCard } from '../../components/project-card/project-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Navbar, ProjectCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  // DATOS SIMULADOS (MOCK DATA)
  proyectos = [
    {
      titulo: 'Educación Digital Rural',
      categoria: 'Educación',
      img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800',
      recaudado: 15420,
      meta: 30000
    },
    {
      titulo: 'Agua Limpia para Todos',
      categoria: 'Salud',
img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',      recaudado: 8750,
      meta: 20000
    },
    {
      titulo: 'Reforestación El Imposible',
      categoria: 'Ambiente',
      img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800',
      recaudado: 22300,
      meta: 25000
    }
  ];
}
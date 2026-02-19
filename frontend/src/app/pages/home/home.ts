import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { ProjectCard } from '../../components/project-card/project-card';
import { ProyectoService } from '../../services/proyecto.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Navbar, ProjectCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  proyectos: any[] = [];

  constructor(private proyectoService: ProyectoService) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    // 1. Corregido el nombre a obtenerTarjetas()
    this.proyectoService.obtenerTarjetas().subscribe({
      // 2. Agregados los tipos : any[] y : any para que Angular no se queje
      next: (data: any[]) => {
        this.proyectos = data.map((p: any) => ({
          id: p.idProyecto,
          titulo: p.titulo,
          descripcion: p.categoria,
          metaMonto: p.meta,
          montoRecaudado: p.recaudado,
          imagen: p.imagenUrl || 'https://via.placeholder.com/300x200'
        }));
      },
      error: (err: any) => {
        console.error('Error al obtener proyectos:', err);
      }
    });
  }
}
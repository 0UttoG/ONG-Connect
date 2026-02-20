import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Importar ChangeDetectorRef
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

  // 2. Inyectar el ChangeDetectorRef en el constructor
  constructor(
    private proyectoService: ProyectoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.proyectoService.obtenerTarjetas().subscribe({
      next: (data: any[]) => {
        this.proyectos = data.map((p: any) => ({
          id: p.idProyecto,
          titulo: p.titulo,
          descripcion: p.categoria,
          metaMonto: p.meta,
          montoRecaudado: p.recaudado,
          imagen: p.imagenUrl || 'https://via.placeholder.com/300x200'
        }));
        
        // 3. ACTUALIZACIÓN FORZADA: Pinta la pantalla inmediatamente
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error al obtener proyectos:', err);
      }
    });
  }
}
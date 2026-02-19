import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // <-- 1. Importamos ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ProyectoService } from '../../services/proyecto.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, Navbar, RouterLink],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css'
})
export class ProjectDetails implements OnInit {
  
  // 2. Inicializamos con un objeto vacío para evitar que el HTML colapse
  proyecto: any = {
    titulo: 'Cargando...',
    categoria: '',
    imagen: '',
    metaMonto: 0,
    montoRecaudado: 0,
    descripcionLarga: '',
    diasRestantes: 0,
    donantes: 0
  };

  constructor(
    private route: ActivatedRoute,
    private proyectoService: ProyectoService,
    private cdr: ChangeDetectorRef // <-- 3. Inyectamos la herramienta de Angular
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idUrl = Number(params.get('id'));
      if (idUrl) {
        this.cargarDatosDelBackend(idUrl);
      }
    });
  }

  cargarDatosDelBackend(id: number) {
    this.proyectoService.obtenerDetallesProyecto(id).subscribe({
      next: (data: any) => {
        this.proyecto = data;
        
        // 4. Le ordenamos a Angular que refresque la pantalla inmediatamente
        this.cdr.detectChanges(); 
      },
      error: (err: any) => {
        console.error('Error al cargar detalles:', err);
      }
    });
  }

  get porcentaje(): number {
    if (!this.proyecto || this.proyecto.metaMonto <= 0) return 0;
    return Math.min((this.proyecto.montoRecaudado / this.proyecto.metaMonto) * 100, 100);
  }
}
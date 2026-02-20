import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProyectoService } from '../../services/proyecto.service'; 

@Component({
  selector: 'app-admin-proyectos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-proyectos.html',
  styleUrl: './admin-proyectos.css'
})
export class AdminProyectos implements OnInit {
  
  proyectos: any[] = [];
  mostrarModal = false;
  modoEdicion = false; 

  proyectoForm = {
    id: 0,
    nombre: '',
    descripcion: '',
    categoria: '',
    sucursal: '',
    meta: 0,
    estado: 'activo'
  };

  constructor(
    private proyectoService: ProyectoService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.cargarProyectosReales();
  }

  cargarProyectosReales() {
    this.proyectoService.obtenerTarjetas().subscribe({
      next: (data: any[]) => {
        this.proyectos = data.map((p: any) => ({
          id: p.idProyecto,
          nombre: p.titulo, 
          sucursal: 'Sede Central', 
          meta: p.meta,           // <--- CORREGIDO PARA QUE MUESTRE LOS NÚMEROS
          recaudado: p.recaudado, // <--- CORREGIDO PARA QUE MUESTRE LOS NÚMEROS
          estado: 'activo' 
        }));
        this.cdr.detectChanges(); 
      },
      error: (err: any) => console.error('Error al cargar proyectos reales:', err)
    });
  }

  abrirModalCrear() {
    this.modoEdicion = false;
    this.proyectoForm = { id: 0, nombre: '', descripcion: '', categoria: '', sucursal: '', meta: 0, estado: 'activo' };
    this.mostrarModal = true;
  }

  abrirModalEditar(proyecto: any) {
    this.modoEdicion = true;
    this.proyectoForm = { 
      id: proyecto.id,
      nombre: proyecto.nombre, 
      descripcion: '', 
      categoria: '', 
      sucursal: proyecto.sucursal, 
      meta: proyecto.meta, 
      estado: proyecto.estado 
    };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarProyecto() {
    if (this.modoEdicion) {
      console.log('Datos a actualizar en BD:', this.proyectoForm);
      alert('Se enviará la actualización a la Base de Datos.');
    } else {
      console.log('Nuevo proyecto a insertar en BD:', this.proyectoForm);
      alert('Se insertará en la Base de Datos.');
    }
    this.cerrarModal();
  }
}
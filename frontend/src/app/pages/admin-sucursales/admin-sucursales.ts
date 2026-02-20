import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SucursalService } from '../../services/sucursal.service';

@Component({
  selector: 'app-admin-sucursales',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-sucursales.html',
  styleUrl: './admin-sucursales.css'
})
export class AdminSucursales implements OnInit {
  sucursales: any[] = [];
  mostrarModal = false;
  modoEdicion = false;

  // Variables exactas de tu tabla 'sedes' en SQL
  sucursalForm = {
    id_sede: 0,
    nombre_sede: '',
    direccion: '',
    contacto: ''
  };

  constructor(
    private sucursalService: SucursalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarSucursalesReales();
  }

  cargarSucursalesReales() {
    this.sucursalService.getSucursales().subscribe({
      next: (data) => {
        this.sucursales = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.log('Esperando el endpoint de sedes de Nestor...')
    });
  }

  abrirModalCrear() {
    this.modoEdicion = false;
    this.sucursalForm = { id_sede: 0, nombre_sede: '', direccion: '', contacto: '' };
    this.mostrarModal = true;
  }

  abrirModalEditar(sede: any) {
    this.modoEdicion = true;
    this.sucursalForm = { ...sede }; // Copia los datos reales al formulario
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarSucursal() {
    alert(this.modoEdicion ? 'Actualizando sede...' : 'Creando sede...');
    this.cerrarModal();
  }

  // ALERTA DE CONFIRMACIÓN PARA ELIMINAR
  eliminarSucursal(id: number) {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta sucursal? Esta acción no se puede deshacer.');
    if (confirmacion) {
      alert(`Sede con ID ${id} enviada para eliminación.`);
      // Aquí irá el this.sucursalService.delete(id)...
    }
  }
}
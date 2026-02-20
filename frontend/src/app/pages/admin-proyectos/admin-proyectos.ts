import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProyectoService } from '../../services/proyecto.service';
import { SedeService } from '../../services/sede.service';
import { TipoProyectoService } from '../../services/tipo-proyecto.service';

@Component({
  selector: 'app-admin-proyectos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-proyectos.html',
  styleUrl: './admin-proyectos.css'
})
export class AdminProyectos implements OnInit {
  
  proyectos: any[] = [];
  sedesLista: any[] = []; 
  tiposLista: any[] = []; 
  
  modalAbierto = false;
  modoEdicion = false;

  // Modelo del formulario
  proyectoForm = {
    id: 0,
    nombre: '',
    descripcion: '',
    meta: 0,
    estado: 'activo',
    fechaInicio: '',
    fechaLimite: '',
    fechaLogroMeta: '', 
    idSede: null as any,
    idTipoProyecto: null as any,
    prioridadRiesgo: 1 
  };

  constructor(
    private proyectoService: ProyectoService,
    private sedeService: SedeService,
    private tipoProyectoService: TipoProyectoService
  ) {}

  ngOnInit() {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales() {
    this.proyectoService.obtenerTarjetas().subscribe({
      next: (datos) => this.proyectos = datos,
      error: (err) => console.error('Error cargando proyectos', err)
    });

    this.sedeService.obtenerSedes().subscribe({
      next: (datos) => this.sedesLista = datos,
      error: (err) => console.error('Error cargando sedes', err)
    });

    this.tipoProyectoService.obtenerTipos().subscribe({
      next: (datos) => this.tiposLista = datos,
      error: (err) => console.error('Error cargando tipos de proyecto', err)
    });
  }

  abrirModalCrear() {
    this.modoEdicion = false;
    const hoy = new Date().toISOString().split('T')[0];
    
    this.proyectoForm = {
      id: 0,
      nombre: '',
      descripcion: '',
      meta: 0,
      estado: 'activo',
      fechaInicio: hoy,
      fechaLimite: hoy,
      fechaLogroMeta: hoy,
      idSede: this.sedesLista.length > 0 ? this.sedesLista[0].idSede : null,
      idTipoProyecto: this.tiposLista.length > 0 ? this.tiposLista[0].idTipoProyecto : null,
      prioridadRiesgo: 1
    };
    this.modalAbierto = true;
  }

  // ==========================================
  // ESTA ES LA PARTE QUE CORREGIMOS
  // ==========================================
  abrirModalEditar(proyectoDeTabla: any) {
    this.modoEdicion = true;
    // Extraemos el ID del proyecto de la fila seleccionada
    const id = proyectoDeTabla.id_proyecto || proyectoDeTabla.idProyecto || proyectoDeTabla.id;

    // Llamamos al servicio para obtener el proyecto COMPLETO desde la tabla 'proyectos'
    this.proyectoService.obtenerProyectoPorId(id).subscribe({
      next: (fullProyecto) => {
        // Ahora asignamos los nombres exactos que vienen de tu Entidad Java
        this.proyectoForm = {
          id: fullProyecto.idProyectos, 
          nombre: fullProyecto.nombreProyecto,
          descripcion: fullProyecto.descripcion,
          meta: fullProyecto.metaFinanciera,
          estado: fullProyecto.estado,
          fechaInicio: fullProyecto.fechaInicio,
          fechaLimite: fullProyecto.fechaLimite,
          fechaLogroMeta: fullProyecto.fechaLogroMeta,
          idSede: fullProyecto.idSede,
          idTipoProyecto: fullProyecto.idTipoProyecto,
          prioridadRiesgo: fullProyecto.prioridadRiesgo
        };
        this.modalAbierto = true;
      },
      error: (err) => {
        console.error("Error al cargar detalle para editar", err);
        alert("No se pudieron cargar los datos completos para editar.");
      }
    });
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

  guardarProyecto() {
    if (!this.proyectoForm.fechaLogroMeta || !this.proyectoForm.fechaLimite) {
      alert("Por favor, completa todas las fechas obligatorias.");
      return;
    }

    const payload = {
      nombreProyecto: this.proyectoForm.nombre,
      descripcion: this.proyectoForm.descripcion,
      metaFinanciera: this.proyectoForm.meta,
      estado: this.proyectoForm.estado,
      fechaInicio: this.proyectoForm.fechaInicio,
      fechaLimite: this.proyectoForm.fechaLimite,
      fechaLogroMeta: this.proyectoForm.fechaLogroMeta,
      prioridadRiesgo: Number(this.proyectoForm.prioridadRiesgo),
      idSede: Number(this.proyectoForm.idSede),
      idTipoProyecto: Number(this.proyectoForm.idTipoProyecto)
    };

    if (this.modoEdicion) {
      this.proyectoService.actualizarProyecto(this.proyectoForm.id, payload).subscribe({
        next: () => this.finalizarGuardado('¡Proyecto actualizado correctamente!'),
        error: (err) => console.error('Error al actualizar', err)
      });
    } else {
      this.proyectoService.crearProyecto(payload).subscribe({
        next: () => this.finalizarGuardado('¡Proyecto creado con éxito!'),
        error: (err) => console.error('Error al crear', err)
      });
    }
  }

  private finalizarGuardado(mensaje: string) {
    alert(mensaje);
    this.cerrarModal();
    this.cargarDatosIniciales();
  }

  eliminarProyecto(id: number) {
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
      this.proyectoService.eliminarProyecto(id).subscribe({
        next: () => this.cargarDatosIniciales(),
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }
}
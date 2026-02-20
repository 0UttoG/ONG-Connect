import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { DonacionService } from '../../services/donacion.service';
import { ProyectoService } from '../../services/proyecto.service'; // <-- Importamos esto

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './donation.html',
  styleUrl: './donation.css'
})
export class Donation implements OnInit {
  montoPersonalizado: number | null = null;
  montoSeleccionado: number = 25; 
  
  proyectosLista: any[] = []; // <-- Ahora será una lista de objetos reales de tu BD

  payloadDonacion = {
    idSede: 1,
    idDonante: 0,
    idTipo: 1, 
    idProyecto: 0, // <-- Se enlazará directamente con el desplegable
    cantidad: 0,
    descripcion: 'Donación realizada desde la plataforma web',
    estadoComprobante: true
  };

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private donacionService: DonacionService,
    private proyectoService: ProyectoService // <-- Lo inyectamos aquí
  ) {}

  ngOnInit() {
    // 1. Verificar sesión
    if (typeof window !== 'undefined' && window.localStorage) {
      const idDonanteGuardado = localStorage.getItem('idDonante');
      if (idDonanteGuardado) {
        this.payloadDonacion.idDonante = Number(idDonanteGuardado);
      } else {
        alert("Debes iniciar sesión para poder donar.");
        this.router.navigate(['/login']);
        return; // Detenemos la ejecución si no hay sesión
      }
    }

    // 2. Cargar proyectos reales desde el backend
    this.proyectoService.obtenerTarjetas().subscribe(datos => {
      this.proyectosLista = datos;
      
      // 3. Revisar si venimos de darle "Donar" a un proyecto específico
      this.route.queryParams.subscribe(params => {
        if (params['idProyecto']) {
          this.payloadDonacion.idProyecto = Number(params['idProyecto']);
        } else if (this.proyectosLista.length > 0) {
          // Si entramos directo a /donation, preseleccionar el primer proyecto
          this.payloadDonacion.idProyecto = this.proyectosLista[0].idProyecto;
        }
      });
    });
  }

  seleccionarMonto(monto: number) {
    this.montoSeleccionado = monto;
    this.montoPersonalizado = null; 
  }

  procesarDonacion() {
    this.payloadDonacion.cantidad = this.montoPersonalizado || this.montoSeleccionado;

    if (this.payloadDonacion.cantidad <= 0) {
      alert("Por favor, ingresa una cantidad válida.");
      return;
    }

    this.donacionService.registrarDonacion(this.payloadDonacion).subscribe({
      next: (respuesta) => {
        alert(`¡Gracias de corazón! ❤️\nHemos registrado tu donación de $${this.payloadDonacion.cantidad}`);
        this.router.navigate(['/']); 
      },
      error: (err) => {
        console.error('Error procesando donación', err);
        alert(err.error?.error || 'Ocurrió un error al procesar la donación.');
      }
    });
  }
}
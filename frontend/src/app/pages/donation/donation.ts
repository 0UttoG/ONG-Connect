import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para el formulario
import { Navbar } from '../../components/navbar/navbar';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, RouterLink],
  templateUrl: './donation.html',
  styleUrl: './donation.css'
})
export class Donation implements OnInit {
  montoPersonalizado: number | null = null;
  montoSeleccionado: number = 25; // Botón de $25 por defecto
  proyectoSeleccionado: string = 'Fondo General (Uso en todos los proyectos)';

  // Lista de causas para el menú desplegable
  proyectosLista = [
    'Fondo General (Uso en todos los proyectos)',
    'Educación Digital Rural',
    'Agua Limpia para Todos',
    'Reforestación El Imposible',
    'Comedores Infantiles',
    'Refugio Animal La Esperanza',
    'Techos Seguros',
    'Becas Universitarias',
    'Clínica Móvil Comunitaria',
    'Mujeres Emprendedoras'
  ];

  // Inyectamos ActivatedRoute para leer la URL
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // MAGIA: Leer si venimos de un proyecto específico
    this.route.queryParams.subscribe(params => {
      if (params['proyecto']) {
        this.proyectoSeleccionado = params['proyecto'];
      }
    });
  }

  // Función para los botones rápidos de $10, $25, etc.
  seleccionarMonto(monto: number) {
    this.montoSeleccionado = monto;
    this.montoPersonalizado = null; // Limpia la caja de texto
  }

  procesarDonacion() {
    const montoFinal = this.montoPersonalizado || this.montoSeleccionado;
    alert(`¡Gracias de corazón! ❤️\nEstamos procesando tu donación de $${montoFinal} para: ${this.proyectoSeleccionado}`);
  }
}
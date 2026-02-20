import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Importamos el servicio

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  constructor(public authService: AuthService, private router: Router) {}

  // Esta función revisa en tiempo real si el usuario está logueado
  get estaLogueado(): boolean {
    return this.authService.estaAutenticado();
  }

  // La lógica de tu botón "Mi Perfil"
  accionMiPerfil() {
    if (this.estaLogueado) {
      this.router.navigate(['/perfil']); // Si hay sesión, al perfil
    } else {
      this.router.navigate(['/login']);  // Si no, al login
    }
  }

  // Opcional: Para el botón de cerrar sesión
  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/']);
  }
}
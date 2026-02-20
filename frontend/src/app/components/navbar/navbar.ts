import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive], 
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  constructor(public authService: AuthService, private router: Router) {}

  get estaLogueado(): boolean {
    return this.authService.estaAutenticado();
  }

  accionMiPerfil() {
    if (this.estaLogueado) {
      this.router.navigate(['/perfil']); 
    } else {
      this.router.navigate(['/login']);  
    }
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/']);
  }
}
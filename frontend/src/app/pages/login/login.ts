import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../components/navbar/navbar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // <-- Importar

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  credenciales = {
    correo: '',
    password: ''
  };

  constructor(private authService: AuthService) {} // <-- Inyectar

  iniciarSesion() {
    this.authService.login(this.credenciales).subscribe({
      next: (respuesta) => {
        // El backend devuelve { idUsuario: X, idRol: Y, mensaje: "...", idDonante: Z }
        alert(respuesta.mensaje); 
        // Aquí podrías guardar el ID en localStorage y redirigir con Router
      },
      error: (err) => {
        // Tu backend devuelve status 401 y { error: "..." }
        alert(err.error.error || 'Ocurrió un error');
      }
    });
  }
}
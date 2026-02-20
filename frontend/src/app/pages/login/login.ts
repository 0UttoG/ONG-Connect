import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../components/navbar/navbar';
import { RouterLink, Router } from '@angular/router'; 
import { AuthService } from '../../services/auth.service';

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

  constructor(private authService: AuthService, private router: Router) {}

  iniciarSesion() {
    this.authService.login(this.credenciales).subscribe({
      next: (respuesta) => {
        // Asegurarnos de que estamos en el navegador antes de guardar
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('idDonante', respuesta.idDonante); 
        }
        
        alert('¡Inicio de sesión exitoso!');
        this.router.navigate(['/']); 
      },
      error: (err) => {
        console.error('Error en el login', err);
        alert(err.error?.error || 'Correo o contraseña incorrectos');
      }
    });
  }
}
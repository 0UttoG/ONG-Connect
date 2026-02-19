import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../components/navbar/navbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  // Datos que enviaremos al backend
  credenciales = {
    correo: '',
    password: ''
  };

  iniciarSesion() {
    console.log('Intentando iniciar sesión con:', this.credenciales);
    alert(`¡Bienvenido de vuelta! Validando credenciales...`);
  }
}
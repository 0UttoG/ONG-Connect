import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../components/navbar/navbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  // OBJETO EXACTO PARA EL BACKEND
  usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    password: ''
  };

  registrar() {
    console.log('Enviando datos al Backend:', this.usuario);
    alert(`¡Registro Exitoso! Bienvenido ${this.usuario.nombre} ${this.usuario.apellido}`);
  }
}
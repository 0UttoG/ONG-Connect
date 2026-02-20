import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../components/navbar/navbar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  usuario = {
    nombre: '', apellido: '', correo: '', telefono: '', password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  registrar() {
    this.authService.registrar(this.usuario).subscribe({
      next: (res) => {
        alert(res.mensaje || "Registro exitoso"); 
        this.router.navigate(['/login']); 
      },
      error: (err) => {
        alert('Error: ' + (err.error?.error || 'No se pudo registrar'));
      }
    });
  }
}
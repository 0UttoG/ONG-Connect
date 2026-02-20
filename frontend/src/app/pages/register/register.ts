import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../components/navbar/navbar';
import { RouterLink, Router } from '@angular/router'; // 1. Importar Router
import { AuthService } from '../../services/auth.service'; // 2. Importar tu AuthService

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

  // 3. Inyectar AuthService y Router en el constructor
  constructor(private authService: AuthService, private router: Router) {}

  registrar() {
    console.log('Enviando datos al Backend:', this.usuario);
    
    // 4. Llamar al backend a través del servicio
    this.authService.registrar(this.usuario).subscribe({
      next: (respuesta) => {
        // Mostramos el mensaje de éxito que manda Spring Boot
        alert(respuesta.mensaje || '¡Registro Exitoso!');
        
        // Redirigimos al usuario a la pantalla de login para que entre con su nueva cuenta
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        
        // Mostramos el error exacto que manda tu AuthController (ej. correo duplicado)
        alert(err.error?.error || 'Ocurrió un error al intentar registrarte.');
      }
    });
  }
}
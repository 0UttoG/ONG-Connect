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
    correo: '', password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  iniciarSesion() {
    this.authService.login(this.credenciales).subscribe({
      next: (res) => {
        alert("¡Inicio de sesión exitoso!"); 
        
        // MAGIA DE REDIRECCIONAMIENTO
        // Buscamos el ID que manda Java (puede venir como idRol, id_rol, o idTipoUsuario)
        const idRol = res.idRol || res.id_rol || res.idTipoUsuario || res.id_tipo_usuario;

        if (idRol === 1) {
            // Es el Jefe (Admin) -> Va al panel de Estadísticas
            this.router.navigate(['/admin']);
        } else if (idRol === 5) {
            // Es Donante Normal -> Va al Inicio (Dashboard de proyectos)
            this.router.navigate(['/']); 
        } else {
            // Por seguridad, si es otro número raro, al inicio
            this.router.navigate(['/']);
        }
      },
      error: (err) => {
        alert('Error: Credenciales incorrectas');
      }
    });
  }
}
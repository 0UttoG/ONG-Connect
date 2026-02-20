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
        
        // 1. GUARDAMOS EL GAFETE EN EL NAVEGADOR
        this.authService.guardarSesion(res);

        // 2. REDIRECCIÓN MAGICA
        const idRol = res.idRol || res.id_rol || res.idTipoUsuario || res.id_tipo_usuario;

        if (idRol === 1) {
            this.router.navigate(['/admin']);
        } else {
            this.router.navigate(['/']); 
        }
      },
      error: (err) => {
        alert('Error: Credenciales incorrectas');
      }
    });
  }
}
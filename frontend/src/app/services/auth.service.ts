import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  login(credenciales: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credenciales);
  }

  registrar(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, usuario);
  }

  // --- NUEVAS FUNCIONES PARA LA SESIÓN (CORREGIDAS) ---

  guardarSesion(datosUsuario: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('usuarioONG', JSON.stringify(datosUsuario));
    }
  }

  obtenerUsuarioLogueado() {
    if (typeof window !== 'undefined') {
      const usuario = localStorage.getItem('usuarioONG');
      return usuario ? JSON.parse(usuario) : null;
    }
    return null;
  }

  estaAutenticado(): boolean {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('usuarioONG') !== null;
    }
    return false;
  }

  cerrarSesion() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('usuarioONG');
    }
  }
}
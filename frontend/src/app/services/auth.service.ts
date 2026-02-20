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

  // --- NUEVAS FUNCIONES PARA LA SESIÓN ---

  guardarSesion(datosUsuario: any) {
    // Guarda los datos del usuario en la memoria del navegador
    localStorage.setItem('usuarioONG', JSON.stringify(datosUsuario));
  }

  obtenerUsuarioLogueado() {
    const usuario = localStorage.getItem('usuarioONG');
    return usuario ? JSON.parse(usuario) : null;
  }

  estaAutenticado(): boolean {
    return localStorage.getItem('usuarioONG') !== null;
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioONG');
  }
}
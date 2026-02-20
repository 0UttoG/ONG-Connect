import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoProyectoService {
  // Esta ruta debe coincidir con el TipoProyectoController que creaste en el paso anterior
  private apiUrl = 'http://localhost:8080/api/tipos-proyecto';

  constructor(private http: HttpClient) { }

  obtenerTipos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
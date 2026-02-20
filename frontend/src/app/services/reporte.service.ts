import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private apiUrl = 'http://localhost:8080/api/reportes'; // Ruta para Nestor

  constructor(private http: HttpClient) { }

  getDatosReporte(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/resumen`);
  }

  // Llama a la API de Nestor que genera el PDF (igual a la del correo)
  descargarPDF() {
    window.open(`${this.apiUrl}/exportar/pdf`, '_blank');
  }

  descargarExcel() {
    window.open(`${this.apiUrl}/exportar/excel`, '_blank');
  }
}
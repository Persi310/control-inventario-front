import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { Tienda } from 'src/app/models/tienda';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TiendasService {

  private apiUrl = 'http://127.0.0.1:8000/api';
  
    constructor(private http: HttpClient) { }

    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`, // Obtén el token desde localStorage
      }),
    };
  
    getTiendas(): Observable<{ message: string, tiendas: Tienda[] }> {
      return this.http.get<{ message: string, tiendas: Tienda[] }>(`${this.apiUrl}/tiendas`);
    }

    actualizarTienda(tiendaActualizada: Tienda): Observable<{ message: string; categorias: Tienda[] }> {
      const { id, tienda, direccion } = tiendaActualizada; 
      const body = { tienda, direccion }; // Datos de la tienda a actualizar
    
      return this.http.put<{ message: string; categorias: Tienda[] }>(
        `${this.apiUrl}/tiendas/${id}`,
        body, // Incluye los datos de la tienda en el cuerpo de la solicitud
        this.httpOptions
      );
    }

    eliminarTienda(categoria_id: number): Observable<{ message: string; categorias: Tienda[]; }> {
      return this.http.delete<{ message: string; categorias: Tienda[]; }>(`${this.apiUrl}/tiendas/${categoria_id}`, this.httpOptions);
    }

    agregarTienda(tienda: { tienda: string, direccion: string }): Observable<{ mensaje: string }> {
      return this.http.post<{ mensaje: string }>(`${this.apiUrl}/tiendas`, tienda, this.httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {

      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente
        console.error('Ocurrió un error:', error.error.message);
      } else {
        // Error del lado del servidor
        console.error(`Código de error: ${error.status}, ${error.error}`);
      }
      // Devuelve un observable con un mensaje de error
      return throwError('Ocurrió un error. Por favor, intenta de nuevo más tarde.');
    }
}

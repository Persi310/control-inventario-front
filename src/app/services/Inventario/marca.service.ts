import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Marca } from 'src/app/models/marca';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

    private apiUrl = 'http://127.0.0.1:8000/api';
  
    constructor(private http: HttpClient) { }

    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`, 
      }),
    };
  
    getMarcas(): Observable<{ message: string, marcas: Marca[] }> {
      return this.http.get<{ message: string, marcas: Marca[] }>(`${this.apiUrl}/marcas`);
    }

    actualizarMarca(marca_parametro: Marca): Observable<{ message: string; marcas: Marca[] }> {
      const { id, marca } = marca_parametro; 
      const marcaActualizada = { marca };
      return this.http.put<{ message: string; marcas: Marca[] }>(
        `${this.apiUrl}/marcas/${id}`,
        marcaActualizada, 
        this.httpOptions
      );
    }

    eliminarMarca(marca_id: number): Observable<{ message: string; marcas: Marca[]; }> {
      return this.http.delete<{ message: string; marcas: Marca[]; }>(`${this.apiUrl}/marcas/${marca_id}`, this.httpOptions);
    }

    agregarMarca(marca: string): Observable<{ mensaje: string }> {
      return this.http.post<{ mensaje: string }>(`${this.apiUrl}/marcas`, { marca }, this.httpOptions)
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
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private apiUrl = 'http://127.0.0.1:8000/api';
  
    constructor(private http: HttpClient) { }

    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`, // Obtén el token desde localStorage
      }),
    };
  
    getCategorias(): Observable<{ message: string, categorias: Categoria[] }> {
      return this.http.get<{ message: string, categorias: Categoria[] }>(`${this.apiUrl}/categorias`);
    }

    actualizarCategoria(categoria_parametro: Categoria): Observable<{ message: string; categorias: Categoria[] }> {
      const { id, categoria } = categoria_parametro; // Obtener el id y nombre de la categoría
      const categoriaActualizada = { categoria };
      return this.http.put<{ message: string; categorias: Categoria[] }>(
        `${this.apiUrl}/categorias/${id}`,
        categoriaActualizada, // Enviar solo el nombre
        this.httpOptions
      );
    }

    eliminarCategoria(categoria_id: number): Observable<{ message: string; categorias: Categoria[]; }> {
      return this.http.delete<{ message: string; categorias: Categoria[]; }>(`${this.apiUrl}/categorias/${categoria_id}`, this.httpOptions);
    }

    agregarCategoria(categoria: string): Observable<{ mensaje: string }> {
      return this.http.post<{ mensaje: string }>(`${this.apiUrl}/categorias`, { categoria }, this.httpOptions)
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

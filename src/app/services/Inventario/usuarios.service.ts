import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Usuarios } from 'src/app/models/usuarios';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'http://127.0.0.1:8000/api';
  
    constructor(private http: HttpClient) { }

    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`, // Obtén el token desde localStorage
      }),
    };
  
    getUsers(): Observable<{ message: string, usuarios: Usuarios[] }> {
      return this.http.get<{ message: string, usuarios: Usuarios[] }>(`${this.apiUrl}/users`);
    }

    agregarUsuarios(tienda: { first_name: string, username: string, last_name: string, is_superuser: boolean, is_staff: boolean, is_active: boolean,date_joined: string, email: string, password: string, direccion: string, telefono: string, nombre_empresa: string }): Observable<{ mensaje: string }> {
      return this.http.post<{ mensaje: string }>(`${this.apiUrl}/users`, tienda, this.httpOptions)
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

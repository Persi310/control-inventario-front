import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { Marca } from 'src/app/models/marca';
import { Categoria } from 'src/app/models/categoria';
import { Usuarios } from 'src/app/models/usuarios';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'http://127.0.0.1:8000/api';
  
    constructor(private http: HttpClient) { }

    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`, // Obtén el token desde localStorage
      }),
    };
  
    getProductos(): Observable<{ message: string, productos: Producto[] }> {
      return this.http.get<{ message: string, productos: Producto[] }>(`${this.apiUrl}/productos`);
    }

    getMarcas(): Observable<{ message: string, marcas: Marca[] }> {
      return this.http.get<{ message: string, marcas: Marca[] }>(`${this.apiUrl}/marcas`);
    }

    getCategorias(): Observable<{ message: string, categorias: Categoria[] }> {
      return this.http.get<{ message: string, categorias: Categoria[] }>(`${this.apiUrl}/categorias`);
    }

    getProveedores(): Observable<{ message: string, usuarios: Usuarios[] }> {
      return this.http.get<{ message: string, usuarios: Usuarios[] }>(`${this.apiUrl}/users`);
    }

    agregarProducto(tienda: { nombre: string, descripcion: string, precio: number, cantidad_minima: number, categoria_id: number, marca_id: number, proveedor_id: number }): Observable<{ mensaje: string }> {
      return this.http.post<{ mensaje: string }>(`${this.apiUrl}/productos`, tienda, this.httpOptions)
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

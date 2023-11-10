import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compra } from 'src/app/models/compra';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private apiUrl = 'http://127.0.0.1:8000/api';
  
    constructor(private http: HttpClient) { }

    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`, // Obtén el token desde localStorage
      }),
    };
  
    getCompras(): Observable<{ message: string, compras: Compra[] }> {
      return this.http.get<{ message: string, compras: Compra[] }>(`${this.apiUrl}/compras`);
    }

    agregarCompras(compra: { fecha: string; usuario_id: number; productos: any[] }): Observable<{ mensaje: string }> {
      console.log('Datos a enviar:', compra);
      return this.http.post<{ mensaje: string }>(`${this.apiUrl}/compras`, { compra })
        .pipe(
          catchError(this.handleError)
  );
    }

    getProductosCompra(compraId: number) {
      return this.http.get<any>(`http://127.0.0.1:8000/api/productos_compra/${compraId}`);
      // Reemplaza 'ID' con el ID real de la compra que deseas mostrar
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from 'src/app/models/venta';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private apiUrl = 'http://127.0.0.1:8000/api';
  
    constructor(private http: HttpClient) { }

    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`, // Obtén el token desde localStorage
      }),
    };
  
    getVentas(): Observable<{ message: string, ventas: Venta[] }> {
      return this.http.get<{ message: string, ventas: Venta[] }>(`${this.apiUrl}/ventas`);
    }

    agregarVenta(venta: { fecha: string; usuario_id: number; productos: any[] }): Observable<{ mensaje: string }> {
      console.log('Datos a enviar:', venta);
      return this.http.post<{ mensaje: string }>(`${this.apiUrl}/ventas`, { venta })
        .pipe(
          catchError(this.handleError)
  );
    }

    getProductosVenta(compraId: number) {
      return this.http.get<any>(`http://127.0.0.1:8000/api/productos_venta/${compraId}`);
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

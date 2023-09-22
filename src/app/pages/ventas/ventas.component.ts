import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VentasService } from 'src/app/services/Inventario/ventas.service';
import { Venta } from 'src/app/models/venta';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {
  ventas: Venta[] = [];
  nuevaVentas: string = '';
  
  constructor(private ventaService: VentasService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.ventaService.getVentas().subscribe(
      (data) => {
        this.ventas = data.ventas;
      },
      (error) => {
        console.error('Error al obtener las categorias:', error);
      }
    );
  }

  agregarVenta() {
    if (!this.nuevaVentas || this.nuevaVentas.trim() === '') {
      console.error('El nombre de la marca no puede estar vacío');
      return;
    }
  
    this.ventaService.agregarVenta(this.nuevaVentas).subscribe(
      (data) => {
        console.log(data);
        this._snackBar.open("Marca agregada satisfactoriamente", "X");
      },
      (error) => {
        console.error('Error al agregar la marca:', error);
        this._snackBar.open(error, "X");
      }
    );
  
    this.nuevaVentas = '';
  }

}

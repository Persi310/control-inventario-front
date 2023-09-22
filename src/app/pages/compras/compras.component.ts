import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComprasService } from 'src/app/services/Inventario/compras.service';
import { Compra } from 'src/app/models/compra';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {

  compras: Compra[] = [];
  nuevaCompra: string = '';

  constructor(private comprasService: ComprasService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.comprasService.getCompras().subscribe(
      (data) => {
        this.compras = data.compras;
      },
      (error) => {
        console.error('Error al obtener las categorias:', error);
      }
    );
  }

  agregarCompras() {
    if (!this.nuevaCompra || this.nuevaCompra.trim() === '') {
      console.error('El nombre de la marca no puede estar vacío');
      return;
    }
  
    this.comprasService.agregarCompras(this.nuevaCompra).subscribe(
      (data) => {
        console.log(data);
        this._snackBar.open("Marca agregada satisfactoriamente", "X");
      },
      (error) => {
        console.error('Error al agregar la marca:', error);
        this._snackBar.open(error, "X");
      }
    );
  
    this.nuevaCompra = '';
  }

}

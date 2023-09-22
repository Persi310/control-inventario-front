import { Component } from '@angular/core';
import { MarcaService } from 'src/app/services/Inventario/marca.service';
import { Marca } from 'src/app/models/marca';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent {

  marcas: Marca[] = [];
  nuevaMarca: string = '';

  constructor(private marcaService: MarcaService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.marcaService.getMarcas().subscribe(
      (data) => {
        this.marcas = data.marcas;
      },
      (error) => {
        console.error('Error al obtener las marcas:', error);
      }
    );
  }

  agregarMarca() {
    if (!this.nuevaMarca || this.nuevaMarca.trim() === '') {
      console.error('El nombre de la marca no puede estar vacío');
      return;
    }
  
    this.marcaService.agregarMarca(this.nuevaMarca).subscribe(
      (data) => {
        console.log(data);
        this._snackBar.open("Marca agregada satisfactoriamente", "X");
      },
      (error) => {
        console.error('Error al agregar la marca:', error);
        this._snackBar.open(error, "X");
      }
    );
  
    this.nuevaMarca = '';
  }

}

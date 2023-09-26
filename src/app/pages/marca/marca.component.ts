import { Component } from '@angular/core';
import { MarcaService } from 'src/app/services/Inventario/marca.service';
import { Marca } from 'src/app/models/marca';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MarcaDialogComponent } from 'src/app/marca-dialog/marca-dialog.component';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent {

  marcas: Marca[] = [];
  nuevaMarca: string = '';

  constructor(private marcaService: MarcaService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

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

  verMarca(marcas: Marca) {
    this.dialog.open(MarcaDialogComponent, {
      data: { marcas },
    });
  }
  
  editarMarca(marcas: Marca) {
    this.dialog.open(MarcaDialogComponent, {
      data: { marcas, isEditing: true },
    });
  }
  
  eliminarMarca(marcas: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: '¿Seguro que deseas eliminar esta categoría?' },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Lógica para eliminar la categoría aquí.
        // Implementa la lógica de eliminación de la categoría.
        // Por ejemplo, this.categoriasService.eliminarCategoria(categoria.id);
      }
    });
  }

}

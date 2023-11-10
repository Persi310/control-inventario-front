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

  verMarca(marca: Marca) {
    this.dialog.open(MarcaDialogComponent, {
      data: { marca },
    });
  }
  
  editarMarca(marca: Marca) {
    console.log('Editar marca:', marca);
    const dialogRef = this.dialog.open(MarcaDialogComponent, {
      data: { marca, isEditing: true },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Resultado del diálogo:', result);
      if (result && result.isEditing) {
        this.marcaService.actualizarMarca(result.marca).subscribe(
          (data) => {
            console.log(data);
            this._snackBar.open('Marca editada satisfactoriamente', 'X');
          },
          (error) => {
            console.error('Error al editar la marca:', error);
            this._snackBar.open(error, 'X');
          }
        );
      }
    });
  }
  
  eliminarMarca(marca: Marca) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: '¿Seguro que deseas eliminar esta marca?' },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.marcaService.eliminarMarca(marca.id).subscribe(
          (data) => {
            console.log(data);
            this._snackBar.open('Marca eliminada satisfactoriamente', 'X');
            // Vuelve a obtener la lista de marcas después de eliminar una.
            this.marcaService.getMarcas().subscribe((data) => {
              this.marcas = data.marcas;
            });
          },
          (error) => {
            console.error('Error al eliminar la marca:', error);
            this._snackBar.open(error, 'X');
          }
        );
      }
    });
  }

}

import { Component } from '@angular/core';
import { CategoriasService } from 'src/app/services/Inventario/categorias.service';
import { Categoria } from 'src/app/models/categoria';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaDialogComponent } from 'src/app/categoria-dialog/categoria-dialog.component';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {
  categorias: Categoria[] = [];
  nuevaCategoria: string = '';

  constructor(private categoriasService: CategoriasService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.categoriasService.getCategorias().subscribe(
      (data) => {
        this.categorias = data.categorias;
      },
      (error) => {
        console.error('Error al obtener las categorias:', error);
      }
    );
  }

  agregarCategoria() {
    if (!this.nuevaCategoria || this.nuevaCategoria.trim() === '') {
      console.error('El nombre de la marca no puede estar vacío');
      return;
    }
  
    this.categoriasService.agregarCategoria(this.nuevaCategoria).subscribe(
      (data) => {
        console.log(data);
        this._snackBar.open("Categoria agregada satisfactoriamente", "X");
      },
      (error) => {
        console.error('Error al agregar la Categoria:', error);
        this._snackBar.open(error, "X");
      }
    );
  
    this.nuevaCategoria = '';
  }

  verCategoria(categoria: Categoria) {
    this.dialog.open(CategoriaDialogComponent, {
      data: { categoria },
    });
  }
  
  editarCategoria(categoria: Categoria) {
    console.log('Editar categoría:', categoria);
    const dialogRef = this.dialog.open(CategoriaDialogComponent, {
      data: { categoria, isEditing: true },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Resultado del diálogo:', result);
      if (result && result.isEditing) {
        console.log(result.categoria)
        this.categoriasService.actualizarCategoria(result.categoria).subscribe(
          (data) => {
            console.log(data);
            this._snackBar.open("Categoria editada satisfactoriamente", "X");
          },
          (error) => {
            console.error('Error al editar la categoria:', error);
            this._snackBar.open(error, "X");
          }
        );
      }
    });
  }
  
  eliminarCategoria(categoria: Categoria) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: '¿Seguro que deseas eliminar esta categoría?' },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoriasService.eliminarCategoria(categoria.id).subscribe(
          (data) => {
            console.log(data);
            this._snackBar.open("Categoria Eliminada satisfactoriamente", "X");
          },
          (error) => {
            console.error('Error al eliminar la categoria:', error);
            this._snackBar.open(error, "X");
          }
        );
      }
    });
  }

}

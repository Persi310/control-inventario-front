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
        this._snackBar.open("Marca agregada satisfactoriamente", "X");
      },
      (error) => {
        console.error('Error al agregar la marca:', error);
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
    this.dialog.open(CategoriaDialogComponent, {
      data: { categoria, isEditing: true },
    });
  }
  
  eliminarCategoria(categoria: any) {
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

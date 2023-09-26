import { Component } from '@angular/core';
import { TiendasService } from 'src/app/services/Inventario/tiendas.service';
import { Tienda } from 'src/app/models/tienda';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from 'src/app/models/categoria';
import { MatDialog } from '@angular/material/dialog';
import { TiendaDialogComponent } from 'src/app/tienda-dialog/tienda-dialog.component';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent {
  tiendas: Tienda[] = [];
  nuevaTienda: { tienda: string, direccion: string } = { tienda: '', direccion: '' };

  constructor(private tiendaService: TiendasService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.tiendaService.getTiendas().subscribe(
      (data) => {
        this.tiendas = data.tiendas;
      },
      (error) => {
        console.error('Error al obtener las marcas:', error);
      }
    );
  }

  agregarTienda() {
    if (!this.nuevaTienda || !this.nuevaTienda.tienda || !this.nuevaTienda.direccion) {
      console.error('Debes completar ambos campos');
      return;
    }
  
    this.tiendaService.agregarTienda(this.nuevaTienda).subscribe(
      (data) => {
        console.log(data);
        this._snackBar.open("Tienda agregada satisfactoriamente", "X");
      },
      (error) => {
        console.error('Error al agregar la tienda:', error);
        this._snackBar.open(error, "X");
      }
    );
  
    // Reiniciar los campos después de agregar la tienda
    this.nuevaTienda = { tienda: '', direccion: '' };
  }

  verTienda(tiendas: Tienda) {
    this.dialog.open(TiendaDialogComponent, {
      data: { tiendas },
    });
  }
  
  editarTienda(tiendas: Tienda) {
    this.dialog.open(TiendaDialogComponent, {
      data: { tiendas, isEditing: true },
    });
  }
  
  eliminarTienda(tiendas: any) {
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

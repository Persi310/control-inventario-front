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

  verTienda(tienda: Tienda) {
    this.dialog.open(TiendaDialogComponent, {
      data: { tienda, isEditing: false },
    });
  }
  
  editarTienda(tienda: Tienda) {
    console.log('Editar tienda:', tienda);
    const dialogRef = this.dialog.open(TiendaDialogComponent, {
      data: { tienda, isEditing: true },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Resultado del diálogo:', result);
      if (result && result.isEditing) {
        this.tiendaService.actualizarTienda(result.tienda).subscribe(
          (data) => {
            console.log(data);
            this._snackBar.open("Tienda editada satisfactoriamente", "X");
            // Recargar la lista de tiendas después de la edición
            this.tiendaService.getTiendas().subscribe(
              (tiendas) => {
                this.tiendas = tiendas.tiendas;
              },
              (error) => {
                console.error('Error al obtener las tiendas:', error);
              }
            );
          },
          (error) => {
            console.error('Error al editar la tienda:', error);
            this._snackBar.open(error, "X");
          }
        );
      }
    });
  }
  
  eliminarTienda(tienda: Tienda) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: '¿Seguro que deseas eliminar esta tienda?' },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tiendaService.eliminarTienda(tienda.id).subscribe(
          (data) => {
            console.log(data);
            this._snackBar.open('Tienda eliminada satisfactoriamente', 'X');
            // Actualizar la lista de tiendas después de eliminar una
            this.tiendaService.getTiendas().subscribe(
              (tiendas) => {
                this.tiendas = tiendas.tiendas;
              },
              (error) => {
                console.error('Error al obtener las tiendas:', error);
              }
            );
          },
          (error) => {
            console.error('Error al eliminar la tienda:', error);
            this._snackBar.open(error, 'X');
          }
        );
      }
    });
  }
  
}

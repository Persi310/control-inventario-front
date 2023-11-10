import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tienda } from '../models/tienda';

@Component({
  selector: 'app-tienda-dialog',
  templateUrl: './tienda-dialog.component.html',
  styleUrls: ['./tienda-dialog.component.css']
})
export class TiendaDialogComponent {
  tienda: Tienda;

  constructor(
    public dialogRef: MatDialogRef<TiendaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.tienda = { ...data.tienda }; // Copia la tienda para evitar cambios en el objeto original
  }

  cerrarDialog(): void {
    this.dialogRef.close();
  }

  guardarCambios(): void {
    this.dialogRef.close({ tienda: this.tienda, isEditing: true });
  }
}

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-producto-dialog',
  templateUrl: './producto-dialog.component.html',
  styleUrls: ['./producto-dialog.component.css']
})
export class ProductoDialogComponent {
  producto: Producto;

  constructor(
    public dialogRef: MatDialogRef<ProductoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Realiza una copia de la instancia del Producto
    this.producto = { ...data.producto };
  }

  cerrarDialog(): void {
    this.dialogRef.close();
  }

  guardarCambios(): void {
    // Enviar los datos actualizados al componente principal
    this.dialogRef.close({ producto: this.producto, isEditing: true });
  }
}

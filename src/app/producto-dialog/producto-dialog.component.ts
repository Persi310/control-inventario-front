import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-producto-dialog',
  templateUrl: './producto-dialog.component.html',
  styleUrls: ['./producto-dialog.component.css']
})
export class ProductoDialogComponent {
  categoria: any = {};

  constructor(
    public dialogRef: MatDialogRef<ProductoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.categoria = { ...data.categoria }; // Copia la categoría para evitar cambios en el objeto original
  }

  cerrarDialog(): void {
    this.dialogRef.close();
  }

  guardarCambios(): void {
    // Aquí puedes implementar la lógica para guardar los cambios en la categoría
    // this.categoria contiene la categoría editada
    this.dialogRef.close();
  }
}

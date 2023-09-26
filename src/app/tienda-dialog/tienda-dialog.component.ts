import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tienda-dialog',
  templateUrl: './tienda-dialog.component.html',
  styleUrls: ['./tienda-dialog.component.css']
})
export class TiendaDialogComponent {
  categoria: any = {};

  constructor(
    public dialogRef: MatDialogRef<TiendaDialogComponent>,
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

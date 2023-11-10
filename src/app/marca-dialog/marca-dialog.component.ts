import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Marca } from '../models/marca';

@Component({
  selector: 'app-marca-dialog',
  templateUrl: './marca-dialog.component.html',
  styleUrls: ['./marca-dialog.component.css']
})
export class MarcaDialogComponent {
  marca: Marca;

  constructor(
    public dialogRef: MatDialogRef<MarcaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.marca = { ...data.marca };
  }

  cerrarDialog(): void {
    this.dialogRef.close();
  }

  guardarCambios(): void {
    this.dialogRef.close({ marca: this.marca, isEditing: true });
  }
}

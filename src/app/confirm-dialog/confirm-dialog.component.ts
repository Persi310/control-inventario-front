import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelar(): void {
    this.dialogRef.close(false); // Se cierra el cuadro de diálogo con 'false'
  }

  confirmar(): void {
    this.dialogRef.close(true); // Se cierra el cuadro de diálogo con 'true'
  }
}

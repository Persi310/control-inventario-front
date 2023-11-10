import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComprasService } from '../services/Inventario/compras.service';

@Component({
  selector: 'app-compra-dialog',
  templateUrl: './compra-dialog.component.html',
  styleUrls: ['./compra-dialog.component.css']
})
export class CompraDialogComponent {
  compra: any = {}; // Objeto para almacenar la compra
  productosCompra: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CompraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private comprasService: ComprasService
  ) {
    this.compra = { ...data.compra }; // Copia la compra para evitar cambios en el objeto original
  }

  ngOnInit() {
    // Llamar a la función para obtener los productos de la compra al inicializar el diálogo
    this.obtenerProductosCompra(this.compra.id);
  }

  cerrarDialog(): void {
    this.dialogRef.close();
  }

  obtenerProductosCompra(compraId: number): void {
    console.log(compraId)
    this.comprasService.getProductosCompra(compraId).subscribe(
      (data) => {
        console.log(data.detalles_compra)
        this.productosCompra = data.detalles_compra;
      },
      (error) => {
        console.error('Error al obtener los productos de la compra:', error);
      }
    );
  }
}

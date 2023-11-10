export interface ProductosVendidos {
  producto__id: number;
  producto__nombre: string;
  total_cantidad: number;
}

export interface ProductosStock {
  producto__nombre: string,
  cantidad_stock: number,
  fecha_ultima_actualizacion: string,
  tienda__tienda: string
}

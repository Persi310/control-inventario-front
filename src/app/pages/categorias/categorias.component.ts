import { Component } from '@angular/core';
import { CategoriasService } from 'src/app/services/Inventario/categorias.service';
import { Categoria } from 'src/app/models/categoria';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {
  categorias: Categoria[] = [];

  constructor(private categoriasService: CategoriasService) { }

  ngOnInit(): void {
    this.categoriasService.getCategorias().subscribe(
      (data) => {
        this.categorias = data.categorias;
      },
      (error) => {
        console.error('Error al obtener las categorias:', error);
      }
    );
  }

  agregarCategoria() {
    
  }
}

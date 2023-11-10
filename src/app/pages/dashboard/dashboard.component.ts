import { Component } from '@angular/core';
import { DashboardService } from 'src/app/services/Inventario/dashboard.service';
import { ProductosVendidos, ProductosStock } from 'src/app/models/dashboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  marcas: ProductosVendidos[] = [];
  productos2 : ProductosStock[] = [];
  userLoginOn:boolean=false;

  constructor(private dashboardService: DashboardService, private router: Router) { }

  ngOnInit(): void {
    this.dashboardService.getProductosmasVendidos().subscribe(
      (data) => {
        console.log(data.top_products);
        this.marcas = data.top_products;
      },
      (error) => {
        console.error('Error al obtener los productos más vendidos:', error);
      }
    );

    this.dashboardService.getProductosmenosStock().subscribe(
      (data) => {
        console.log(data.top_products);
        this.productos2 = data.top_products;
      },
      (error) => {
        console.error('Error al obtener los productos más vendidos:', error);
      }
    );
  }

  irAVentas() {
    this.router.navigate(['/ventas']);
  }

  irAProductos() {
    this.router.navigate(['/compras']);
  }
}

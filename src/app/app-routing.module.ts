import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard'; 
import { LoginComponent } from './auth/login/login.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { MarcaComponent } from './pages/marca/marca.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { UsersComponent } from './pages/users/users.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'categoria', component: CategoriasComponent, canActivate: [AuthGuard] },
  { path: 'ventas', component: VentasComponent, canActivate: [AuthGuard] },
  { path: 'compras', component: ComprasComponent, canActivate: [AuthGuard] },
  { path: 'inventario', component: InventarioComponent, canActivate: [AuthGuard] },
  { path: 'marca', component: MarcaComponent, canActivate: [AuthGuard] },
  { path: 'producto', component: ProductoComponent, canActivate: [AuthGuard] },
  { path: 'tienda', component: TiendaComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'recuperar-contrasena', component: RecuperarContrasenaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

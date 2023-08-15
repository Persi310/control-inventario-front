import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { MarcaComponent } from './pages/marca/marca.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { UsersComponent } from './pages/users/users.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'inicio', component:DashboardComponent },
  { path: 'login', component:LoginComponent },
  { path: 'categoria', component:CategoriasComponent },
  { path: 'marca', component:MarcaComponent },
  { path: 'producto', component:ProductoComponent },
  { path: 'tienda', component:TiendaComponent },
  { path: 'users', component:UsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

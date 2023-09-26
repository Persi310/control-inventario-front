import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { HeaderComponent} from './shared/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { MarcaComponent } from './pages/marca/marca.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { UsersComponent } from './pages/users/users.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VentasComponent } from './pages/ventas/ventas.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { CategoriaDialogComponent } from './categoria-dialog/categoria-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component';
import { MarcaDialogComponent } from './marca-dialog/marca-dialog.component';
import { ProductoDialogComponent } from './producto-dialog/producto-dialog.component';
import { TiendaDialogComponent } from './tienda-dialog/tienda-dialog.component';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    NavbarComponent,
    CategoriasComponent,
    MarcaComponent,
    ProductoComponent,
    TiendaComponent,
    UsersComponent,
    VentasComponent,
    ComprasComponent,
    InventarioComponent,
    CategoriaDialogComponent,
    ConfirmDialogComponent,
    RecuperarContrasenaComponent,
    MarcaDialogComponent,
    ProductoDialogComponent,
    TiendaDialogComponent,
    UsersDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatSnackBarModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

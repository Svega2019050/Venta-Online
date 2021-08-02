import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './component/admin/list-user/list-user.component';
import { SaveUserAdminComponent } from './component/admin/save-user-admin/save-user-admin.component';
import { EditUserComponent } from './component/edit-user/edit-user.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { RegisterComponent } from './component/register/register.component';
import { CartComponent } from './component/sale/cart/cart.component';
import { CategryComponent } from './component/sale/categry/categry.component';
import { DetallesComponent } from './component/sale/detalles/detalles.component';
import { ModoPagoComponent } from './component/sale/modo-pago/modo-pago.component';
import { ProductDetailsComponent } from './component/sale/product-details/product-details.component';
import { ProductComponent } from './component/sale/product/product.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'navbar', component: NavbarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'editUser', component:EditUserComponent},
  {path: 'product', component:ProductComponent},
  {path: 'cart', component:CartComponent},
  {path: 'product-details', component:ProductDetailsComponent},
  {path: 'modoPago', component:ModoPagoComponent},
  {path: 'detalles', component:DetallesComponent},
  
  /* Administrador */
  {path: 'saveUserAdmin', canActivate: [AdminGuard], component:SaveUserAdminComponent},
  {path: 'listUsers', canActivate:[AdminGuard], component: ListUserComponent},
  {path: 'category', canActivate:[AdminGuard],component:CategryComponent},
  
  /* Default */
  {path: 'not-Found', component: NotFoundComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

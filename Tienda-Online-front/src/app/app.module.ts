import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Component*/
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { RegisterComponent } from './component/register/register.component';
import { ListUserComponent } from './component/admin/list-user/list-user.component';
import { SaveUserAdminComponent } from './component/admin/save-user-admin/save-user-admin.component';
import { EditUserComponent } from './component/edit-user/edit-user.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { CategryComponent } from './component/sale/categry/categry.component';
import { ProductComponent } from './component/sale/product/product.component';


/* Service */
import { RestUserService } from './services/restUser/rest-user.service';
import { UploadUserService } from './services/uploadUser/upload-user.service';
import { CartComponent } from './component/sale/cart/cart.component';
import { ProductDetailsComponent } from './component/sale/product-details/product-details.component';
import { SearchPipe } from './pipes/search.pipe';
import { SearchCategoryPipe } from './pipes/searchCategorypipe ';
import { SearchProductPipe } from './pipes/searchProduct.pipe';
import { ModoPagoComponent } from './component/sale/modo-pago/modo-pago.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    ListUserComponent,
    SaveUserAdminComponent,
    EditUserComponent,
    NotFoundComponent,
    CategryComponent,
    ProductComponent,
    CartComponent,
    ProductDetailsComponent,
    SearchPipe,
    SearchCategoryPipe,
    SearchProductPipe,
    ModoPagoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [RestUserService,UploadUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

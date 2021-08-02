import { Component, OnInit,DoCheck } from '@angular/core';
import { Product} from 'src/app/models/product';
import { CONNECTION } from 'src/app/services/global.service';
import { RestCategoryService } from 'src/app/services/restCategory/rest-category.service';
import { RestProductService } from 'src/app/services/restProduct/rest-product.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import Swal from 'sweetalert2';
import { SearchProductPipe } from '../../../pipes/searchProduct.pipe';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit,DoCheck {
  productoSelect: Product;
  products:[]; 
  product; 
  category
  message; 

  token;
  user;
  uri;  


  constructor(private restUser:RestUserService,
    private restCategory:RestCategoryService,private restProduct: RestProductService) {
    this.productoSelect = new Product('','','','','','');
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
    this.productoSelect = new Product('','','','','','');
    this.user = JSON.parse(localStorage.getItem('user'));
    this.category = JSON.parse(localStorage.getItem('categorySelect'));
    this.product = JSON.parse(localStorage.getItem('selectProduct'));
    this.listProducts();
  }

  ngDoCheck(){
    this.token = this.restUser.getToken();
    this.user = this.restUser.getUser();
  }

  obtenerData(product){
    this.productoSelect = product;
  }

  listProducts(){
    this.restProduct.getProducts().subscribe((res:any)=>{
      if (res.products) {
        this.products = res.products;
        
      }else{
        alert(this.message)
      }
    },error => alert(error.error.message));
  }

  saveProduct(){
    let category = localStorage.getItem('categorySelect');
    this.restProduct.saveProduct( this.productoSelect,category).subscribe((res:any)=>{
      if (res.productPush) {
        alert(res.message)
        this.category = res.productPush
        localStorage.setItem('category', JSON.stringify(this.category))
        this.listProducts();
      } else {
        alert(res.message);
        this.listProducts();
      }
    },error=> alert(error.error.message));
  }

  deletePoduct(){
    this.restProduct.removeProduct(this.category,this.productoSelect).subscribe((res:any)=>{
      if (res.CategoryPull) {
        alert(res.message)
        this.category = res.CategoryPull
        localStorage.setItem('category', JSON.stringify(res.CategoryPull))
        this.category = this.restCategory.getCategorys();
        this.product = this.category.product;

      } else {
        Swal.fire({       
          icon: 'success',
          title: 'Producto Eliminado Correctamente',
          showConfirmButton: false,
          timer: 1500,         
        });  
      }
      this.listProducts();
    })
    error => alert(error.error.message) 
    
  }

  
  updateProduct(){
    let category = localStorage.getItem('categorySelect');
    this.restProduct.updatePoduct(category, this.productoSelect, ).subscribe((res:any)=>{
      if (res.message) {
        this.category = res.message;
        localStorage.setItem('category', JSON.stringify(res.message))
        Swal.fire({       
          icon: 'success',
          title: 'Producto Actualizado Correctamente',
          showConfirmButton: false,
          timer: 1500,         
        });  
        
      } else {
        console.log(this.productoSelect)
      }
    },error => {
      if (error.status == 404) {
        Swal.fire({
          icon: 'error',
          title: 'Lo sentimos...',
          text: 'Nombre de Producto ya en uso'        
        })
      }
    })
  
  }

  
  saveProductSelect(product){
    localStorage.setItem('selectProduct',JSON.stringify(product));
  
    // para ingresar torneo en el local storage
  }

}

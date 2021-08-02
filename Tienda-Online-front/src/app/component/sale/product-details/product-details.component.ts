import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CONNECTION } from 'src/app/services/global.service';
import { RestCategoryService } from 'src/app/services/restCategory/rest-category.service';
import { RestProductService } from 'src/app/services/restProduct/rest-product.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

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

}

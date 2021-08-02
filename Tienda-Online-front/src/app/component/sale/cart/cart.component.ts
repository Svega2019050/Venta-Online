import { Component, OnInit,DoCheck } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CONNECTION } from 'src/app/services/global.service';
import { RestCart} from 'src/app/services/restProduct/rest-cart';
import { RestCategoryService } from 'src/app/services/restCategory/rest-category.service';
import { RestProductService } from 'src/app/services/restProduct/rest-product.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,DoCheck {
  cartSelect: Cart;
  carts:[]; 
  cart;

  message;

  token;
  user;
  uri;  
  
  constructor(private restUser:RestUserService,private restProduct: RestProductService,
    private restCart: RestCart, private route: Router) {
    this.uri = CONNECTION.URI;
    
  }

  ngOnInit(): void {

    this.listCarts()
  }
  ngDoCheck(){
    this.token = this.restUser.getToken();
    this.user = this.restUser.getUser();
  }

  listCarts(){
    this.restCart.getCarts().subscribe((res:any)=>{
      if (res.carts) {
        this.carts = res.carts
      } else {
        console.log( this.message)
      }
    },error =>{
      if (error.status == 404  ) {
        Swal.fire({
          icon: 'error',
          title: 'Lo sentimos...',
          text: 'No tiene productos en el carrito'        
        })
        this.route.navigateByUrl('home');
      }
    })
   
  }
}

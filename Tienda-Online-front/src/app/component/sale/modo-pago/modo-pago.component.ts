import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { RestCategoryService } from 'src/app/services/restCategory/rest-category.service';
import { RestCart } from 'src/app/services/restProduct/rest-cart';
import { RestProductService } from 'src/app/services/restProduct/rest-product.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modo-pago',
  templateUrl: './modo-pago.component.html',
  styleUrls: ['./modo-pago.component.css']
})
export class ModoPagoComponent implements OnInit {

  cartSelect: Cart;
  carts:[]; 
  cart;

  message;

  token;
  user;
  uri;  
  
  constructor(private restUser:RestUserService,private restProduct: RestProductService,
    private route: Router,private restCart: RestCart) {

  }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  formModel = {
    number: '',
    Mes: '',
    year: '',
    CCV: '',
    name: '',
  }

  buy(){
    this.restCart.buy().subscribe((res: any)=>{
      if (res.buy) {
        Swal.fire({       
          icon: 'success',
          title: 'Compra Exitosa',
          showConfirmButton: false,
          timer: 1500,         
        });  

        this.user = res.buy

      } else {
        Swal.fire({       
          icon: 'success',
          title: 'Compra Exitosa',
          showConfirmButton: false,
          timer: 1500,         
        });  

      }
    },error =>{
      if (error.status == 404  ) {
        Swal.fire({
          icon: 'error',
          title: 'Lo sentimos...',
          text: 'No tiene productos para comprar'        
        })
        this.route.navigateByUrl('home');
      }
    })
  }

}

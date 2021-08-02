import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { RestCategoryService } from 'src/app/services/restCategory/rest-category.service';
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
  private restCategory:RestCategoryService) {

  }
  ngOnInit(): void {
  }


}

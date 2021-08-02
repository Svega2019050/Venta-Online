import { Component, OnInit } from '@angular/core';
import { CONNECTION } from 'src/app/services/global.service';
import { RestCart} from 'src/app/services/restProduct/rest-cart';
import { RestCategoryService } from 'src/app/services/restCategory/rest-category.service';
import { RestProductService } from 'src/app/services/restProduct/rest-product.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  details:[]; 
  cart;

  message;

  token;
  user;
  uri;  
  
  constructor(private restUser:RestUserService,private restProduct: RestProductService,
    private restCart: RestCart,private restCategory:RestCategoryService, private route: Router) {
    this.uri = CONNECTION.URI;
    
  }

  ngOnInit(): void {

    this.listInvoices()
  }
  ngDoCheck(){
    this.token = this.restUser.getToken();
    this.user = this.restUser.getUser();
  }

  listInvoices(){
    this.restCart.getInvoices().subscribe((res:any)=>{
      if (res.carts) {
        this.details = res.details;

      }else{
        //alert(this.message)
        console.log( this.message)
      }
    },error =>{
      if (error.status == 404  ) {
      
      }
      
    })
    
  }

}

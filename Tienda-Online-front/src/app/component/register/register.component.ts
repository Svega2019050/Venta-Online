import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { RestUserService } from '../../services/restUser/rest-user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: User;
  message;
  username:string;

  constructor(private restUser:RestUserService,private route: Router) {
    this.user = new User('', '', '', '', '', '', '', '', 'ROLE_USER', []);
  }

  ngOnInit(): void {
  }

  saverUser(){
    this.restUser.saveUser(this.user).subscribe((res:any)=>{
      if(res.userSaved){
        Swal.fire({       
          icon: 'success',
          title: 'Usuario Guardado Correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.route.navigateByUrl('login');
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Lo Sentimos...',
          text: 'Este Usuario ya existe!'
        })
      }
    })
  }
}

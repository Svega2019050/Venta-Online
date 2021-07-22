import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User;
  token:string;
  userLogged;

  constructor(private restUser:RestUserService, private route: Router) { 
    this.user = new User('','','','','','','','','',[]);
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.restUser.login(this.user, 'true').subscribe((res:any)=>{
      if(!res.token){
        alert(res.message)
      }else{
        this.userLogged = res.user;
        this.token = res.token;
        delete this.userLogged.password;
        if(this.token.length <= 0){
          alert('El token no se generó o capturó de manera correcta');
        }else{
          localStorage.setItem('token', this.token);
          localStorage.setItem('user', JSON.stringify(this.userLogged)); 
          Swal.fire(
            'Bienvenido',
            this.user.username,
            'success'
          )
          
          this.route.navigateByUrl('home');
        }
      }
    },
      error =>{
        if (error.status == 401) {
          Swal.fire({
            icon: 'error',
            title: 'Lo Sentimos...',
            text: 'Contraseña Incorrecta!'
          })
        }else if(error.status == 403){
          Swal.fire({
            icon: 'error',
            title: 'Lo Sentimos...',
            text: 'Usuario Inexistente!'
          })
        }
    })
  }
}

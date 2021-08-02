import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONNECTION } from '../global.service';
import { RestUserService } from '../restUser/rest-user.service';

@Injectable({
  providedIn: 'root'
})
export class RestCartService {
  public uri;
  public token;
  public user;

  constructor(private http:HttpClient, private restUser:RestUserService) { 
    this.uri = CONNECTION.URI;
  }

  private extractData(res:Response){
    let body = res;
    return body || [] || {}
  }
  public httpOptionsAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
  }

  getToken(){
    let token = localStorage.getItem('token');
    if(token != undefined || token != null){
      this.token = token; 
    }else{
      this.token = null
    }
    return this.token;
  }

  /* Agregar al carrito */

  
}

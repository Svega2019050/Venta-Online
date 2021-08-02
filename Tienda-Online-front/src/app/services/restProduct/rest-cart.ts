import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONNECTION } from '../global.service';
import { RestUserService } from '../restUser/rest-user.service';
import { RestCategoryService } from '../restCategory/rest-category.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestCart{
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

  addCart(idProduct){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.restUser.getToken()
    })
    return this.http.post(this.uri+'addProduct/'+idProduct._id, null,{headers:headers} )
    .pipe(map(this.extractData))
  }
  
  getCarts(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })

    return this.http.get(this.uri+'getCart', {headers:headers} )
    .pipe(map(this.extractData))

  }

  buy(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })

    return this.http.post(this.uri+'buy', null,{headers:headers} )
    .pipe(map(this.extractData))

  }

  getInvoices(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.restUser.getToken()
    })
    return this.http.get(this.uri+'getInvoices',{headers:headers})
    .pipe(map(this.extractData))
  }

  
}

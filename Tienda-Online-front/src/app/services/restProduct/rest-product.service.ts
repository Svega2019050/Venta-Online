import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONNECTION } from '../global.service';
import { RestUserService } from '../restUser/rest-user.service';
import { RestCategoryService } from '../restCategory/rest-category.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestProductService {
  public uri;
  public token;
  public user;

  constructor(private http:HttpClient, private restUser:RestUserService, private restCategory: RestCategoryService) { 
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

  saveProduct( product, idC){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.restCategory.getToken()
    })
    let params = JSON.stringify(product);
    let idCParams = JSON.parse(idC);
    return this.http.put(this.uri+'createProduct/'+idCParams._id , params, {headers:headers})
    .pipe(map(this.extractData))
  }

  
  getProducts(){
    return this.http.get(this.uri+'getProducts', this.httpOptionsAuth)
    .pipe(map(this.extractData))
  }

  removeProduct( category,product){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.restCategory.getToken()
    })
    return this.http.put(this.uri+category._id+ '/removeProduct/'+ product._id , null,{headers:headers})
    .pipe(map(this.extractData))
    
  }

  updatePoduct(category, product){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.restCategory.getToken()
    })
    let params = JSON.stringify(product);
    let categoryParams = JSON.parse(category);
    return this.http.put(this.uri+categoryParams._id+ '/updateProduct/'+ product._id , params, {headers:headers})
    .pipe(map(this.extractData))
  }

 
}

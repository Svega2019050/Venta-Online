import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global.service';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class RestUserService {
  public uri:string;
  public user;
  public token;

  constructor(private http:HttpClient) { 
    this.uri = CONNECTION.URI;
  }

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

 
  public httpOptionsAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
  }
  
  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  getUser(){
    let user = JSON.parse(localStorage.getItem('user'));
    if(user != undefined || user != null){
      this.user = user;
    }else{
      this.user = null;
    }
    return this.user;
  }

  getToken(){
    let token = localStorage.getItem('token');
    if(token != undefined || token != null){
      this.token = token;
      var xhr = new XMLHttpRequest();
    }else{
      this.token = null
    }
    return this.token;
  }

  /* Guardar Usuario */
  saveUser(user){
    let params = JSON.stringify(user);
    return this.http.post(this.uri + 'saveUser',params,this.httpOptions)
      .pipe(map(this.extractData));
  }

  /* Eliminar User */
  deleteUser(idUser, password){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.put(this.uri + 'removeUser/' + idUser,{password: password},{headers:headers}).
    pipe(map(this.extractData));
  }

  /* Actualizar User */

  updateUser(userToUpdate){
    let params = JSON.stringify(userToUpdate);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.put(this.uri + 'updateUser/'+userToUpdate._id,params, {headers:headers}).pipe(map(this.extractData));
  }

  /* Login */
  login(user, token){
    user.gettoken = token;
    let params = JSON.stringify(user);
    return this.http.post(this.uri+ 'login', params, this.httpOptions)
    .pipe(map(this.extractData))
  }

  /* Administrador */
  saverUserByAdmin(user, idAdmin){
    let params = JSON.stringify(user);
    return this.http.post(this.uri+'saveUserByAdmin/'+idAdmin, params, this.httpOptionsAuth)
      .pipe(map(this.extractData))
  }

  deleteUserAdmin(idUser, idUser2,password){
    return this.http.put(this.uri+idUser + '/deleteUserAdmin/' + idUser2._id, {password: password},  this.httpOptionsAuth)
    .pipe(map(this.extractData))
  }

  
  updateUserAdmin(idUser,userToUpdate){
    let params = JSON.stringify(userToUpdate);    
    return this.http.put(this.uri+idUser + '/UpdateUserAdmin/'+userToUpdate._id, params, this.httpOptionsAuth)
    .pipe(map(this.extractData))
  }

  getUsers(){
    return this.http.get(this.uri+'getUser', this.httpOptionsAuth)
    .pipe(map(this.extractData))
  }

}

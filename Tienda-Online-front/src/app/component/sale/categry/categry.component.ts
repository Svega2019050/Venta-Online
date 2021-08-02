import { Component, OnInit ,DoCheck} from '@angular/core';
import { CONNECTION } from 'src/app/services/global.service';
import { RestUserService } from '../../../services/restUser/rest-user.service';
import { Category } from '../../../models/category';
import {RestCategoryService} from '../../../services/restCategory/rest-category.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-categry',
  templateUrl: './categry.component.html',
  styleUrls: ['./categry.component.css']
})
export class CategryComponent implements OnInit,DoCheck {
  categorys:[];
  categorySelect: Category;
  categoryNew: Category;

  carts:[]; 
  category;
  message;
  token;
  user;
  uri;

  constructor(private restUser:RestUserService,
    private restCategory:RestCategoryService) { 
      this.categorySelect = new Category('','','','',[]);
      this.uri = CONNECTION.URI;
      
    }

  ngOnInit(): void {
    localStorage.removeItem('categorySelect');
    this.listCategories();

  }

  ngDoCheck(){
    this.token = this.restUser.getToken();
    this.user = this.restUser.getUser();
  }

  obtenerData(category){
    this.categorySelect = category;
   // console.log(this.categorySelect);
  }

  listCategories(){
    this.restCategory.getCategorys().subscribe((res:any)=>{
      if (res.categorys) {
        this.categorys = res.categorys;
      }else{
        alert(this.message)
      }
    },error => alert(error.error.message));
  }

  saveCategory(){
    this.restCategory.saveCategory(this.user._id,this.categorySelect).subscribe((res:any)=>{
      if(res.categoryPush){
        localStorage.setItem('user',JSON.stringify(this.user))
        this.user = res.categoryPush
        Swal.fire({       
          icon: 'success',
          title: 'Categoria Guardada Correctamente',
          showConfirmButton: false,
          timer: 1500,         
        });  
      }
      this.listCategories();
    },error =>{
      if (error.status == 404) {
        Swal.fire({
          icon: 'error',
          title: 'Lo sentimos...',
          text: 'Nombre de Categoria ya en uso'        
        })
      }
    })
  }

  removeCategory(){
    this.restCategory.removeCategory(this.user._id, this.categorySelect).subscribe((res:any)=>{
      if (res.categoryPull) {
          alert(res.message)
          localStorage.setItem('user',JSON.stringify(res.categoryPull));
          this.user = this.restUser.getUser();
          this.category = this.user.category;
      } else {
        Swal.fire({       
          icon: 'success',
          title: 'Categoria Eliminada Correctamente',
          showConfirmButton: false,
          timer: 1500,         
        });  
      }
      this.listCategories();
    },
    error => alert(error.error.message))
    
  }

  updateCategory(){
    this.restCategory.updateCategory(this.user._id, this.categorySelect).subscribe((res:any)=>{
      if (res.message) {
        localStorage.setItem('user',JSON.stringify(this.user));
        Swal.fire({       
          icon: 'success',
          title: 'Categoria Actualizada Correctamente',
          showConfirmButton: false,
          timer: 1500,         
        });  
      } 
      this.listCategories();
    },
    error => {
      if (error.status == 404) {
        Swal.fire({
          icon: 'error',
          title: 'Lo sentimos...',
          text: 'Nombre de Categoria ya en uso'        
        })
      }
      this.listCategories();
    })
    
  }


  saveCategoryLocal(category){
    localStorage.setItem('categorySelect',JSON.stringify(category));
     // para ingresar torneo en el local storage
  }
}

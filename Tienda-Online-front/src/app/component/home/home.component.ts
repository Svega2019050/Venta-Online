import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CONNECTION } from 'src/app/services/global.service';
import { RestCategoryService } from 'src/app/services/restCategory/rest-category.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categorys:[];
  categorySelect: Category;
  category;
  message;
  token;
  user;
  uri;

  constructor(private restUser:RestUserService,
    private restCategory:RestCategoryService, ) { 
      this.categorySelect = new Category('','','','',[]);
      this.uri = CONNECTION.URI;
      
    }

  ngOnInit(): void {
    this.listCategories();
    localStorage.removeItem('categorySelect');
  }

  ngDoCheck(){
    this.token = this.restUser.getToken();
    this.user = this.restUser.getUser();
  }

  obtenerData(category){
    this.categorySelect = category;
    console.log(this.categorySelect);
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

  saveCategoryLocal(category){
    localStorage.setItem('categorySelect',JSON.stringify(category));
     // para ingresar torneo en el local storage
  }

}

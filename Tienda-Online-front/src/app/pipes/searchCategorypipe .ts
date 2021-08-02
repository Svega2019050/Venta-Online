import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'searchs'
})
export class SearchCategoryPipe implements PipeTransform {

  transform(categorys: any, search: any): any {
    if(search == undefined){
      return categorys;
    }else{
      return categorys.filter( Category=>{
        return Category.nameCategory.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

  

}

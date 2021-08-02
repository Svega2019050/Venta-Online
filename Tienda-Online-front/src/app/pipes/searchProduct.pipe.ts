import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchP'
})
export class SearchProductPipe implements PipeTransform {

  transform(products: any, search: any): any {
    if(search == undefined){
      return products;
    }else{
      return products.filter( product=>{
        return product.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

  

}

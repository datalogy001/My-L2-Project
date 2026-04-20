import { Component } from '@angular/core';
import { ServicesService } from '../api/services.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  productList :any =[]; 
  constructor(private apiService: ServicesService) {}

  ionViewDidEnter() {
   this.getProducts();
  }

  getProducts()
  {
    this.apiService.getProducts().then((res: any) => {
      if (res)
      this.productList = res;
      else
      this.productList = [];
    }).catch(err => {
      console.log("Something went wrong");
    })
    //End 
  }

}


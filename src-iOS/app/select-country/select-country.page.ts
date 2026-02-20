import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController, } from '@ionic/angular';
@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.page.html',
  styleUrls: ['./select-country.page.scss'],
})
export class SelectCountryPage implements OnInit {

  
  isModalOpen = true;
  @Input("value") value: any;
  selectedInput:any='';
  currencyList: any = [{'text':'USD', 'value':'assets/flags/us.svg'},{'text':'EUR', 'value':'assets/flags/eu.svg'},{'text':'GBP', 'value':'assets/flags/gb.svg'}];
  constructor(private modalCtrl: ModalController, private navController: NavController ) { }

  ngOnInit() {
    this.selectedInput = this.value;
  }

  dismissModal() {
    this.modalCtrl.dismiss({'currencyCode' : this.selectedInput,'changed':false});
  }

 

  optionFocus(datas:any) {
    this.modalCtrl.dismiss({'currencyCode' : datas,'changed':true});
  }


  gotoBack() {
    this.navController.pop();
  }
  gotoTab1() {
    this.navController.navigateRoot('tab1');
  }
  gotoTab5() {
    this.navController.navigateRoot('tab5');
  }
  
}

import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServicesService } from '../api/services.service';


@Component({
  selector: 'app-all-countries-list',
  templateUrl: './all-countries-list.page.html',
  styleUrls: ['./all-countries-list.page.scss'],
})
export class AllCountriesListPage implements OnInit {

  isModalOpen = true;
  uniqueObjects: any = [];
  isLoading: any = true;
  constructor(private service: ServicesService, private modalCtrl: ModalController) { }

  ngOnInit() {
 this.uniqueObjects = window.localStorage.getItem("allcountries");
 this.uniqueObjects = JSON.parse(this.uniqueObjects);
 console.log(JSON.stringify(this.uniqueObjects));
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

}
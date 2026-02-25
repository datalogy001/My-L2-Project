import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-plan-country',
  templateUrl: './plan-country.page.html',
  styleUrls: ['./plan-country.page.scss'],
})
export class PlanCountryPage implements OnInit {
 @Input("countryList") countryList: any;
  constructor( private translate: TranslateService,private modalCtrl: ModalController) { }
  langDefault: any;
  allCountriesList:any=[];
  ngOnInit() {
    this.langDefault = window.localStorage.getItem('L2TraveleSIM_language');
    this.translate.use(this.langDefault).subscribe(() => {
      this.allCountriesList = this.countryList.map((country: any) => ({
        name: this.translate.instant(`COUNTRIES.${country}`),
        iso: country
      }));
    });
  }

  

}

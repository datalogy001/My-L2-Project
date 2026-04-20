import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DateLocalizationService } from '../api/date-localization.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.page.html',
  styleUrls: ['./date-picker.page.scss'],
})
export class DatePickerPage implements OnInit {
  selectedDate: string = new Date().toISOString();
  minDate: string = new Date().toISOString();
  cssClass: any = '';
  value: any;
  localLang:any;

  constructor(
    private navParams: NavParams,
    private modalCtr: ModalController,
    private translate: TranslateService,
    private dateLocalizationService: DateLocalizationService // Inject the service
  ) {
    const today = new Date();
    const minYear = today.getFullYear() - 100;
    this.selectedDate = ''; // Initialize with an empty value or a default date if needed
  }
  tempDate:any;
  tempLang:any;
  selectedLanguage:any;
  ngOnInit() {
    this.selectedDate = this.navParams.get('value');
    this.tempDate = this.navParams.get('value');
    this.selectedLanguage = window.localStorage.getItem("Or4esim_language");

    if(this.selectedLanguage == 'en')
    this.localLang = "en-US"; 
  else
   this.localLang = "fr-FR";

    
    if (this.tempDate == '' || this.tempDate == null) {
      //this.selectedDate = new Date(this.selectedDate).toISOString();
    } else {
      this.convertTempDate();
    }



    if (this.selectedDate == '' || this.selectedDate == null) {
      //this.selectedDate = new Date(this.selectedDate).toISOString();
    } else {
      this.convertDate();
    }

    this.translate.onLangChange.subscribe(() => {
      this.updateLocalizedDate();
    });
  }

  
  convertTempDate() {
    let [day, month, year] = this.tempDate.trim().split('-');
    let formattedDateString = `${year}-${month}-${day}`;
    let dateObject = new Date(formattedDateString);
    this.tempDate = dateObject.toISOString();
  }

  convertDate() {
    let [day, month, year] = this.selectedDate.trim().split('-');
    let formattedDateString = `${year}-${month}-${day}`;
    let dateObject = new Date(formattedDateString);
    this.selectedDate = dateObject.toISOString();
  }

  updateLocalizedDate() {
    const dateFormat = this.dateLocalizationService.getLocalizedDateFormat();
    const localizedDate = dateFormat.format(new Date(this.selectedDate));
    // Update your view or component with localized date
  }

  dismiss() {
    this.modalCtr.dismiss(this.selectedDate);
  }

  close()
  {
    this.modalCtr.dismiss(this.tempDate);
  }
}

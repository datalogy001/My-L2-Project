import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { DateLocalizationService } from '../api/date-localization.service';

@Component({
  selector: 'app-date-picker-fpay',
  templateUrl: './date-picker-fpay.page.html',
  styleUrls: ['./date-picker-fpay.page.scss'],
})
export class DatePickerFpayPage implements OnInit {

  selectedDate: any;
  minDate: string = new Date().toISOString();
  tempDate: any;
  localLang:any;

  constructor(
    private navParams: NavParams,
    private modalCtr: ModalController,
    private translate: TranslateService,
    private dateLocalizationService: DateLocalizationService
  ) {}
  selectedLanguage:any;

  // Convert MM/YY to YYYY-MM
  convertToYearMonth(input: string): string {
    const [month, year] = input.split('/');
    const fullYear = `20${year}`;
    return `${fullYear}-${month}`;
  }

  // Convert YYYY-MM to MM/YY
  convertToMonthYear(input: string): string {
    const [year, month] = input.split('-');
    const shortYear = year.slice(2);
    return `${month}/${shortYear}`;
  }


  ngOnInit() {
  const mmYY = this.navParams.get('value') || this.minDate;
    this.selectedDate = this.convertToYearMonth(mmYY);
    this.tempDate = this.convertToYearMonth(mmYY);
this.selectedLanguage = window.localStorage.getItem("Or4esim_language") || 'nl';

  if(this.selectedLanguage == 'en')
      this.localLang = "en-US";
    else (this.selectedLanguage == 'nl')
      this.localLang = "nl-NL";
}

  dismiss() {
    if (this.isValidDate(this.selectedDate)) {
      this.modalCtr.dismiss(this.selectedDate);
    } else {
      this.modalCtr.dismiss(this.tempDate);
    }
  }

  close() {
    if (this.isValidDate(this.tempDate)) {
      this.modalCtr.dismiss(this.tempDate);
    } else {
      this.modalCtr.dismiss(this.tempDate);
    }
  }

  private isValidDate(dateString: string): boolean {
    return moment(dateString, moment.ISO_8601, true).isValid();
  }
}

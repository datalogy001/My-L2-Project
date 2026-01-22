import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class DateLocalizationService {

  constructor(private translate: TranslateService) {}

  getLocalizedDateFormat() {
    const currentLang = this.translate.currentLang;
    return new Intl.DateTimeFormat(currentLang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatDate(date: Date) {
    const formatter = this.getLocalizedDateFormat();
    return formatter.format(date);
  }
}

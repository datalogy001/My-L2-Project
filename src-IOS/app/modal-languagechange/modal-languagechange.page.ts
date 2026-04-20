import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { SuccessModelPage } from '../success-model/success-model.page';
import { ServicesService } from '../api/services.service';

@Component({
  selector: 'app-modal-languagechange',
  templateUrl: './modal-languagechange.page.html',
  styleUrls: ['./modal-languagechange.page.scss'],
})
export class ModalLanguagechangePage implements OnInit {
  selectedLanguage: any;
  langugaeList: any = [];

  constructor(
    private modalCtrl: ModalController,
    private translate: TranslateService,
    private navController: NavController,
    private service: ServicesService
  ) { }

  ngOnInit() {
    this.selectedLanguage = window.localStorage.getItem("Or4esim_language") || 'nl';
    this.translate.use(this.selectedLanguage);
    this.updateLanguageList();
  }

  updateLanguageList() {
    this.translate.get(['LONG_TEXT_EN', 'LONG_TEXT_NL', 'LONG_TEXT_NL_new']).subscribe(translations => {
      this.langugaeList = [
        { value: 'en', text: 'ENG', long_text: translations['LONG_TEXT_EN'] },
        { value: 'nl', text: 'NLD', long_text: translations['LONG_TEXT_NL_new'] }
      ];
    });
  }

  authToken:any=''; 
  userLanguage: any={'language' : ''};

  submit(optValues:any) {
    if(optValues == 'no')
    {
      this.modalCtrl.dismiss();
    }else
    {
      console.log("New langauge" + this.selectedLanguage);
      this.modalCtrl.dismiss();
      const selectedLang = this.selectedLanguage;
      this.translate.use(selectedLang).subscribe(() => {
        window.localStorage.setItem("Or4esim_Saved_Language", "Yes");
        window.localStorage.setItem("Or4esim_language", selectedLang);
        
        this.updateLanguageList();
        this.successMSGModal(
          this.translate.instant('LANGUAGE_UPDATE'),
          this.translate.instant('LANGUAGE_CHANGED_SUCCESS'),
          3000
        );
    //    this.navController.pop();
      });
    }
   
  }

  async successMSGModal(msg: string, buttonText: string, times: number) {
    const modal = await this.modalCtrl.create({
      component: SuccessModelPage,
      componentProps: { value: msg, value1: buttonText, value2: times }
    });

    modal.onDidDismiss();
    return await modal.present();
  }

  closePopover() {
    this.modalCtrl.dismiss();
  }



}

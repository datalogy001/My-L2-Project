import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { SuccessModelPage } from '../success-model/success-model.page';
import { ServicesService } from '../api/services.service';

@Component({
  selector: 'app-language-settings',
  templateUrl: './language-settings.page.html',
  styleUrls: ['./language-settings.page.scss'],
})
export class LanguageSettingsPage implements OnInit {
  selectedLanguage: any;
  langugaeList: any = [];

  constructor(
    private modalCtrl: ModalController,
    private translate: TranslateService,
    private navController: NavController,
    private service: ServicesService
  ) { }

  ngOnInit() {
    
    this.selectedLanguage = window.localStorage.getItem("L2TraveleSIM_language") || 'en';
    this.translate.use(this.selectedLanguage);
    this.updateLanguageList();
  }




  updateLanguageList() {
    this.translate.get(['LONG_TEXT_EN', 'LONG_TEXT_AR']).subscribe(translations => {
      this.langugaeList = [
        { value: 'en', text: 'EN', long_text: translations['LONG_TEXT_EN'] },
        { value: 'ar', text: 'AR', long_text: translations['LONG_TEXT_AR'] }
      ];
    });
  }
  authToken:any=''; 
  userLanguage: any={'language' : ''};

  changeLanguage(event: any) {
    const selectedLang = event.detail.value;
    this.translate.use(selectedLang).subscribe(() => {
      window.localStorage.setItem("L2TraveleSIM_Saved_Language", "Yes");
      window.localStorage.setItem("L2TraveleSIM_language", selectedLang);
       this.userLanguage.language = selectedLang;

    if (this.userLanguage.language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }

      this.authToken= window.localStorage.getItem("L2TraveleSIM_auth_token");
      if (this.authToken== null) {
        console.log("Bundles not fetched");
      }
      else {
        this.updateUserLanguage();
      }
      this.updateLanguageList();
      this.successMSGModal(
        this.translate.instant('LANGUAGE_UPDATE'),
        this.translate.instant('LANGUAGE_CHANGED_SUCCESS'),
        3000
      );
  //    this.navController.pop();
    });
  }
  //Update user language 
 //Update user language 
 async updateUserLanguage()
 {
 this.service.updateUserLanguage(this.authToken, this.userLanguage).then((res: any) => {
     if (res.code == 200) {
        // Add languages to support
     const languageToSet = res.data.language || 'en';
     this.translate.addLangs(['en','ar']);
     // Set default language
     this.translate.setDefaultLang(languageToSet);
     this.translate.use(languageToSet);
     window.localStorage.setItem("L2TraveleSIM_language", languageToSet);

     }
   }).catch(err => {
 //    this.loadingScreen.dismissLoading();
   });
 } 

 
  async successMSGModal(msg: string, buttonText: string, times: number) {
    const modal = await this.modalCtrl.create({
      component: SuccessModelPage,
      componentProps: { value: msg, value1: buttonText, value2: times }
    });

    modal.onDidDismiss();
    return await modal.present();
  }

  gotoBack() {
    this.navController.pop();
  }

  gotoTab1() {
    this.navController.navigateRoot('tab1');
  }

  gotoMarketPlace()
	  {
	    this.navController.navigateRoot('marketplace');
	  }
    
  gotoTab5() {
  if(window.localStorage.getItem('L2TraveleSIM_auth_token')== null || window.localStorage.getItem('L2TraveleSIM_auth_token')== '') 
this.navController.navigateRoot('tab5');
else
this.navController.navigateRoot('profile');
  }

  gotoHomeSearch() {
    this.navController.navigateRoot('home-search');
  }
}

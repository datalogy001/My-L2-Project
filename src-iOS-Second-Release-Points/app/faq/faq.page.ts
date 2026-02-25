import { Component, OnInit } from '@angular/core';
import { NavController,ModalController } from '@ionic/angular';
import { ServicesService } from '../api/services.service';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  constructor(private loadingScreen: LoadingScreenAppPage,private service: ServicesService, private navController: NavController, private modalCtrl: ModalController) { }
  faqList:any=[]; 

  async ngOnInit() {
    await this.loadingScreen.presentLoading();
    this.service.getFAQS().then((res: any) => {
    this.loadingScreen.dismissLoading();
      if (res.code == 200) {
        this.faqList =res.data.data
      }
    }).catch(err => {
      this.loadingScreen.dismissLoading();
      console.log("Something went wrong");
    })
  }

 gotoBack() {
  this.navController.pop();
}

gotoMarketPlace()
	  {
	    this.navController.navigateRoot('marketplace');
	  }

  gotoTab1() {
    this.navController.navigateRoot('tab1');
  }
  gotoTab5() {
   if(window.localStorage.getItem('L2TraveleSIM_auth_token')== null || window.localStorage.getItem('L2TraveleSIM_auth_token')== '') 
this.navController.navigateRoot('tab5');
else
this.navController.navigateRoot('profile');
  }

  gotoHomeSearch()
  {
    this.navController.navigateRoot('home-search');
  }
}

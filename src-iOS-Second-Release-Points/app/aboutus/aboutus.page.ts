import { Component, OnInit, Input, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ServicesService } from '../api/services.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';



@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.page.html',
  styleUrls: ['./aboutus.page.scss'],
})
export class AboutusPage implements OnInit {

  aboutUsData: any = [];
  tempData:any=[];
  constructor(private loadingScreen: LoadingScreenAppPage,private Router: Router, private emailComposer: EmailComposer, private el: ElementRef, private renderer: Renderer2, private inAppBrowser: InAppBrowser, private service: ServicesService, private navController: NavController, private modalCtrl: ModalController) { }

 
  
  async ngOnInit() {
    await this.loadingScreen.presentLoading();
    this.service.getAboutUs().then((res: any) => {
      this.loadingScreen.dismissLoading();
      if (res.code == 200) {
        this.aboutUsData= res.data[0];
      } else {
        this.aboutUsData = [];
      }
    }).catch(err => {
      this.loadingScreen.dismissLoading();
    })
  }

  ngAfterViewInit() {
    this.openLinksInNewTab();
  }

  openLinksInNewTab() {
    const links = this.el.nativeElement.querySelectorAll('a');

    links.forEach((link: any) => {
      this.renderer.listen(link, 'click', (event) => {
        event.preventDefault();
        const href = link.getAttribute('href');

        // Check if the link is a mailto link
        if (href && href.startsWith('mailto:')) {
          this.openMailComposer(href);
        } else {
          // Open other links in a new tab
          this.inAppBrowser.create(href, '_blank', 'location=yes');
        }
      });
    });
  }

  openMailComposer(mailtoLink: string) {
    const emailAddress = mailtoLink.replace('mailto:', '');

    this.emailComposer.open({
      to: emailAddress
    });
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
    this.navController.navigateRoot('tab5');
  }

  gotoHomeSearch()
  {
    this.navController.navigateRoot('home-search');
  }
  
}
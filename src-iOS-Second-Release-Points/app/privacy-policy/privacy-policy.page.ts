import { Component, OnInit,Input, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { NavController,ModalController } from '@ionic/angular';
import { ServicesService } from '../api/services.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';



@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {

  isPrivacySelected:any= false;
  @Input("value") value: any;
  privacyPolicies:any=[]; 

  constructor(private emailComposer: EmailComposer, private el: ElementRef, private renderer: Renderer2, private inAppBrowser: InAppBrowser,private modalController: ModalController) { }

  ngOnInit() {
    
    this.privacyPolicies = this.value;
    
  }


  ngAfterViewInit() {
    this.openLinksInNewTab();
  }

  openLinksInNewTab() {
    const links = this.el.nativeElement.querySelectorAll('a');

    links.forEach((link:any) => {
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
  
  closePopover(values:any)
  {
      this.modalController.dismiss({ inputValue: values });
  }
}

// src/app/services/facebook-login.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class FacebookLoginService {
  private fbAppId = '1113016376362984';
  private fbRedirectUri = 'https://www.facebook.com/connect/login_success.html';
  private fbApiUrl = 'https://graph.facebook.com/v13.0';
  private fbAppSecret = '940c8da2dbcdae3ee18cb7d5f0e8e7b8';

  constructor( private platform: Platform,private iab: InAppBrowser,private http: HttpClient) {}

  getFacebookAppDomains() {
    // Add development and production domains accordingly
    if (this.platform.is('cordova')) {
      // Running on a mobile device
      return 'http://localhost:8100,http://192.168.x.x:8100,https://www.travelroam.com';
    } else {
      // Running in a web browser
      return 'http://localhost:8100,http://192.168.x.x:8100';
    }
  }


  async facebookLogin() {
    const authUrl = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${this.fbAppId}&redirect_uri=${this.fbRedirectUri}&response_type=token&scope=email,public_profile`;

    // Open the Facebook login page in a new browser window
    const browser = this.iab.create(authUrl, 'blank');
    // Handle the URL changes to extract the access token
    const listener = (event: any) => {
      if (event.url.indexOf(this.fbRedirectUri) === 0) {
        const responseParameters = event.url.split('#')[1];
        const accessToken = responseParameters.split('&')[0].split('=')[1];
        window.localStorage.setItem('fbAccessToken', accessToken);
        browser.close();
      }
    };

     // Attach the 'loadstart' event listener
  browser.on('loadstart').subscribe(listener);

  // Attach the 'exit' event listener
  browser.on('exit').subscribe(() => {
    console.log('Browser is closed.');
  });

    // Add App Domains dynamically
    const appDomains = this.getFacebookAppDomains();
    browser.executeScript({ code: `cordova.InAppBrowser.open('${authUrl}', '_blank', 'location=no,clearcache=yes,toolbar=yes,hidden=yes,hidden=yes,clearsessioncache=yes,cleardata=yes')` });

    // Set the App Domains for the Facebook app
    this.setAppDomains(appDomains);
  }

  // Function to set the App Domains using the Facebook Graph API
  private setAppDomains(domains: string) {
    const apiUrl = `${this.fbApiUrl}/app/domains?access_token=${this.fbAppId}|${this.fbAppSecret}`;
    const data = {
      app_domains: domains.split(',')
    };

    this.http.post(apiUrl, data).subscribe(response => {
      console.log('App Domains set successfully:', response);
    }, error => {
      console.error('Error setting App Domains:', error);
    });
  }

  async getFacebookProfile() {
    const accessToken = await window.localStorage.getItem('fbAccessToken');
    if (!accessToken) {
      throw new Error('No Facebook access token found.');
    }

    const profileUrl = `${this.fbApiUrl}/me?fields=id,name,email&access_token=${accessToken}`;
    return this.http.get(profileUrl);
  }
}

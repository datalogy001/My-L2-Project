import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-get-your-bundle',
  templateUrl: './get-your-bundle.page.html',
  styleUrls: ['./get-your-bundle.page.scss'],
})
export class GetYourBundlePage implements OnInit {
  isESIMCompatible:any;
  constructor(private Router: Router) {  }
  deviceInfo: any;

  ngOnInit() {
  }

  gotoBundle()
  {
    this.Router.navigate(['tab2']);
  }
}

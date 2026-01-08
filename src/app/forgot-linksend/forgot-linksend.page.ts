import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-forgot-linksend',
  templateUrl: './forgot-linksend.page.html',
  styleUrls: ['./forgot-linksend.page.scss'],
})
export class ForgotLinksendPage implements OnInit {

  constructor(private navController: NavController, private Router: Router) { }

  ngOnInit() {
  }


  gotoBack() {
    this.Router.navigate(['/login']);
  }

}

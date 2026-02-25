import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../app/loading.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-loading-screen-app',
  templateUrl: './loading-screen-app.page.html',
  styleUrls: ['./loading-screen-app.page.scss'],
})
export class LoadingScreenAppPage implements OnInit {

  constructor(private loadingService: LoadingService, private translate: TranslateService) { }

  ngOnInit() {}

  async presentLoading() {
    await this.loadingService.presentLoading(this.translate.instant("LOADING_LABEL"));
  }

  async dismissLoading() {
    await this.loadingService.dismissLoading();
  }
}


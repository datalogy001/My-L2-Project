// src/app/components/loading-screen/loading-screen.component.ts
import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../app/loading.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
})
export class LoadingScreenComponent implements OnInit {

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {}

  async presentLoading() {
    await this.loadingService.presentLoading('Loading');
  }

  async dismissLoading() {
    await this.loadingService.dismissLoading();
  }
}

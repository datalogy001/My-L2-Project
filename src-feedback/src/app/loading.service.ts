// src/app/services/loading.service.ts
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading:any;

  constructor(private loadingController: LoadingController) {}

  async presentLoading(message: string = 'Loading') {
    this.loading = await this.loadingController.create({
      message: message,
      spinner: 'crescent',
      cssClass: 'custom-loading',
      translucent: true, // Set translucent to true to remove the overlay
      backdropDismiss: false, // Disable dismissing the loading with a backdrop click
      showBackdrop: false, // Set showBackdrop to false to hide the backdrop
      keyboardClose: false // Disable dismissing the loading with the keyboard
    
    });

    await this.loading.present();
  }

  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }
}

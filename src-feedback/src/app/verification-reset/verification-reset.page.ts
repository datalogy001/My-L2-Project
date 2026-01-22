import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { NavController, ToastController, LoadingController, ModalController } from "@ionic/angular";
import { timer } from 'rxjs';
import { ServicesService } from '../api/services.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-verification-reset',
  templateUrl: './verification-reset.page.html',
  styleUrls: ['./verification-reset.page.scss'],
})
export class VerificationResetPage implements OnInit {

  @Input("value") value: any;
  @ViewChild('otp1') otp1Input: any;
  constructor(private Router: Router, private loadCtr: LoadingController, private service: ServicesService, private modalCtrl: ModalController, private navController: NavController, private toastController: ToastController) {
  }
  interval: any
  num1: any = '';
  num2: any = '';
  num3: any = '';
  num4: any = '';
  tempOTP: any = '';
  tempParam: any = [];
  otp: any = '';
  isDisabled: any = false;
 verifyObj:any={'name' : '','email' : ''}
  ngOnInit() {
    //Recevied OTP value
    this.otp = this.value;
  }

  onPaste(event: ClipboardEvent, currentInput: any, ...nextInputs: any[]): void {
    event.preventDefault();
  
    const pastedText = event.clipboardData?.getData('text/plain') || '';
    const pastedDigits = pastedText.match(/\d/g);
  
    if (pastedDigits) {
      // Set value for the first input
      currentInput.value = pastedDigits[0];
      // Set focus for the first input
      this.otp1Input.setFocus();
  
      // Distribute pasted digits to the remaining input fields
      this.num1 = pastedDigits[0];
      this.num2 = pastedDigits[1];
      this.num3 = pastedDigits[2];
      this.num4 = pastedDigits[3];
      for (let i = 1; i < pastedDigits.length && i <= nextInputs.length; i++) {
        // Set value for the current input
        nextInputs[i - 1].value = pastedDigits[i];
        // Use setTimeout to wait for the focus to be set
        setTimeout(() => {
          // Set focus for the current input
          nextInputs[i - 1].setFocus();
        }, 0);
      }
  
      // Trigger validation after a short delay
      setTimeout(() => {
        this.validate();
      }, 100);
    }
  }
  

  otpChange(event: any, next: any, prev: any, currentInput: any) {
    console.log(currentInput)
    console.log(event.target.value)
    if (event.target.value.length < 1 && prev) {
      prev.setFocus();
      switch (currentInput) {
        case 'otp2':
          this.num1 = event.target.value;
          break;
        case 'otp3':
          this.num2 = event.target.value;
          break;
        case 'otp4':
          this.num3 = event.target.value;
          break;
        default:
          break;
      }
    } else if (next && event.target.value.length > 0) {
      next.setFocus();
    } else {
      // If you want to do something else when no conditions are met
    }

    // Update the corresponding model value based on the current input
   
  }

  //Validation start
  validate() {

    const enteredCode = `${this.num1}${this.num2}${this.num3}${this.num4}`;
    if (enteredCode.trim() == '') {
      this.presentToast("Please enter verification code", "Error");
      return false;
    }
  
    if (enteredCode != this.otp) {
      this.presentToast("Verification code is incorrect", "Error");
      return false;
    }
  
    return true;
  }
  

  async presentToast(msg: any, status: any) {
    const toast = await this.toastController.create({
      header: status,
      message: msg,
      duration: status== 'Error' ? 2000: 3000,
      position: 'top',
      cssClass: status== 'Error' ? 'error-toast': 'success-toast'
    });

    await toast.present();
  }
 
//Submit Verification code 
  closePopover(values:any)
  {  
    this.Router.navigate(['/reset-password']);
    /*if(values ==false)
    {
      this.modalCtrl.dismiss({ inputValue: values });
    }
    else{
    if(this.validate())
    { 
      this.presentToast("Entered code has been verified","Success");
      this.modalCtrl.dismiss({ inputValue: values });
    }

    } */
  }


  async presentLoader() {
    const loading = await this.loadCtr.create({
      message: 'Please wait', // Customize the message as needed
    });
    await loading.present();
    return loading;
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

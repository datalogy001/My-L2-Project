import { PaymentModalPage } from '../payment-modal/payment-modal.page';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonContent, NavController, ToastController, PopoverController, ModalController, LoadingController } from "@ionic/angular";
import { ServicesService } from '../api/services.service';
import { Router, NavigationExtras } from '@angular/router';
import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';
import { PopoverContentLogoPage } from '../popover-content-logo/popover-content-logo.page';
import { CompatibleDevicePage } from '../compatible-device/compatible-device.page';

@Component({
    selector: 'app-bundle-summary',
    templateUrl: './bundle-summary.page.html',
    styleUrls: ['./bundle-summary.page.scss'],
})
export class BundleSummaryPage implements OnInit {

    bundleData: any = [];
    currencyCode: any = '';
    tempDetails: any = [];
    isButtonDisabled: boolean = true;
    paymentMethod: any = '';
    totalAmt: any = '';
    withBackFun: any = '';
    accessToken: any = '';
    paypalObj: any = { 'total_amount': '', 'currency_code': '' };
    browser: any = '';
    successUrl: any = '';
    errorUrl: any = '';
    checkoutObj: any = { 'id': '', 'networkLogos': [], 'networksData': [], 'iccid': '', 'actualAmount': '', 'extraAmount': '', 'currency': '', 'bundleData': [], 'paymentId': '', 'PayerID': '', 'token': '' };
    userDetails: any = [];
    toggleOpt: any = false;
    progressValue: any = '';
    progressValueData: any = '';
    types: any = '';
    roamingEnabled: any = [];
    imageNames: string[] = [];
    networks: any = [];
    networkImages: any = [];
    uniquwNetworks: any = [];
    seen: any = '';
    rate: any;
    iccid: any;
    commissionRate: any;
    @ViewChild(IonContent, { static: false }) content?: IonContent;
    constructor(private popoverController: PopoverController, private iab: InAppBrowser, private loadCtr: LoadingController, private service: ServicesService, private navController: NavController, private toastController: ToastController, private Router: Router, private modalController: ModalController) {
    }


    ngOnInit() {
        this.rate = window.localStorage.getItem('ftel_currency_rate');
        this.commissionRate = window.localStorage.getItem('ftel_commision');
        this.tempDetails = this.Router.getCurrentNavigation()?.extras.state;
        this.bundleData = this.tempDetails.bundleItem;
        this.getNetworksLogo(this.bundleData.countries[0].name);
        this.networkImages = this.tempDetails.networklogos;

        this.iccid = this.tempDetails.iccid;
        this.bundleData.roamingEnabled.sort((a: any, b: any) => a.name.localeCompare(b.name));
        this.roamingEnabled = this.bundleData.roamingEnabled.map((country: { name: string }) => country.name).join(', ') + '.';
        this.progressValue = this.bundleData.duration;
        this.progressValueData = this.bundleData.dataAmount / 1000;
        this.currencyCode = this.tempDetails.currencyCode;
        this.types = this.tempDetails.types;
        window.localStorage.setItem('ftel_types', this.types);
        this.withBackFun = this.tempDetails.withBack;
        this.checkoutObj.actualAmount = this.roundNumberWithoutComm(this.bundleData.price);
        this.checkoutObj.extraAmount = this.roundNumber(this.bundleData.price);
        this.checkoutObj.currency = this.currencyCode;
        this.checkoutObj.bundleData = this.bundleData;
        this.checkoutObj.iccid = this.iccid
        this.checkoutObj.networkLogos = this.tempDetails.networklogos;

        if (window.localStorage.getItem('ftel_token') != null) {
            this.accessToken = window.localStorage.getItem('ftel_token');
            this.userDetails = window.localStorage.getItem('ftel_userDetails');
            this.userDetails = JSON.parse(this.userDetails);
            this.checkoutObj.id = this.userDetails.id;
        }

        //End 
    }


    //Get Network Logos 
    getNetworksLogo(countryName: any) {
      /*  this.service.getNetworksLogo(countryName).then((res: any) => {
            if (res.countryNetworks.length > 0) {
                this.networks = res['countryNetworks'][0]['networks'];
                this.uniquwNetworks = this.removeDuplicates(this.networks, 'name');
            } else {
                this.networks = [];
            }

        }).catch(err => {
            console.log("Something went wrong");
        }) */
    }
    //End 

    removeDuplicates(arr: any, property: any) {
        this.seen = {};
        const uniqueArray = [];

        for (const item of arr) {
            const value = item[property];

            if (!this.seen[value]) {
                this.seen[value] = true;
                uniqueArray.push(item);
            }
        }

        return uniqueArray;
    }

    async gotoNetworkLogos(ev: any) {


        if (this.uniquwNetworks.length > 0) {
            const popover = await this.popoverController.create({
                component: PopoverContentLogoPage,
                componentProps: {
                    items: this.uniquwNetworks,
                },
                event: ev,
            });

            popover.onDidDismiss().then((result: any) => {
                //if (result.role === 'item-selected') {
                //  console.log(`Selected item in the popover: ${result.data}`);
                // }
            });

            return await popover.present();
        }
        else {
            this.presentToastBlackBg("Networks not available", "Error");
        }
    }


    roundToNearestHour(number: any) {
        // Split the number into integer and decimal parts
        var integerPart = Math.floor(number);
        var decimalPart = number - integerPart;

        // Round the decimal part to the nearest hour
        if (decimalPart >= 0.5) {
            integerPart++;
        }

        // Return the result
        return integerPart;
    }

    roundNumberWithoutComm(num: number): number {

        if (this.currencyCode != 'USD') {
            let nums = num * this.rate;
            return this.roundToNearestHour(nums);
        }
        else {
            return this.roundToNearestHour(num);
        }

    }


    roundNumber(num: number): number {

        if (this.currencyCode != 'USD') {
            let commission = num * this.commissionRate;
            let nums = (num + commission) * this.rate;
            return this.roundToNearestHour(nums);
        }
        else {
            let commission = num * this.commissionRate;
            return this.roundToNearestHour(num + commission);
        }

    }

    // Goto Payment Methods 
    async buyNow() {
        //check esim device comptability
        const modal = await this.modalController.create({
            component: CompatibleDevicePage,
        });
        modal.onDidDismiss().then((result: any) => {
            if (result.data.inputValue == true) {

                let navigationExtras: NavigationExtras = {
                    state: {
                        checkoutData: this.checkoutObj,
                        withOutLogin: true
                    }
                };
                if (window.localStorage.getItem('ftel_token') != null)
                    this.Router.navigate(['/payment-detail'], navigationExtras);
                else
                    this.Router.navigate(['/login-prompt'], navigationExtras);
            } else {

            }

        });


        return await modal.present();

        // End 


    }


    async presentLoader(msg: any) {
        const loading = await this.loadCtr.create({
            message: msg
        });
        await loading.present();
        return loading;
    }


    async presentToast(msg: any, status: any) {
        const toast = await this.toastController.create({
            header: status,
            message: msg,
            duration: status == 'Error' ? 1000 : 2000,
            position: 'top',
            cssClass: status == 'Error' ? 'error-toast' : 'success-toast'
        });

        await toast.present();
    }

    async presentToastBlackBg(msg: any, status: any) {
        const toast = await this.toastController.create({
            header: status,
            message: msg,
            duration: status == 'Error' ? 2000 : 2000,
            position: 'top',
            cssClass: 'black-bg'
        });

        await toast.present();
    }



    gotoBack() {
        this.navController.pop();
    }

    //Common Footers
    gotoTab1() {
        if (window.localStorage.getItem("ftel_token") == null)
            this.Router.navigate(['bundle']);
        else
            this.Router.navigate(['tab1']);
    }
    gotoTab4() {
        this.Router.navigate(['tab4']);
    }
    gotoTab5() {
        this.Router.navigate(['tab5']);
    }
    //End of common footers

    gotoTab2() {
        this.Router.navigate(['tab2']);
    }
}

import { Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, ModalController, PopoverController } from '@ionic/angular';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { SuccessModelPage } from '../success-model/success-model.page';
import { PasswordErrorPage } from '../password-error/password-error.page';
import { ServicesService } from '../api/services.service';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { CountryCodeModelPage } from '../country-code-model/country-code-model.page';
import { ModalDeleteprofilepicPage } from '../modal-deleteprofilepic/modal-deleteprofilepic.page';
import { ModalUploadProfileImagePage } from '../modal-upload-profile-image/modal-upload-profile-image.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
import { IonInfiniteScroll, IonContent } from '@ionic/angular';

interface Country {
  short_name: string;
  phone_code: string; // e.g. "+31"
  [key: string]: any;
}

interface ExtractedMobile {
  countryCode: string;
  iso: string;
  number: string;
}

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit, OnDestroy {
  @ViewChild(IonContent, { static: false }) content?: IonContent;

  // Declare as a class property
  private phoneUtil = PhoneNumberUtil.getInstance();
  
  isData:any =true; 
  // Profile model
  profileObj: {
    first_name: string;
    last_name: string;
    email: string;
    profile_image: string;
    date_of_birth: string;
    mobile_number: string;
    country_name?: string;
  } = {
    first_name: '',
    last_name: '',
    email: '',
    profile_image: '',
    date_of_birth: '',
    mobile_number: '',
  };

  // temp and helpers
  tempDetails: any = null;
  token = '';
  isSavedDetails = false;

  // country / phone
  countryCodeObj: { flag: string; code: string; iso?: string } = { flag: '', code: '' };
  countryList: Country[] = [];

  // UI state
  lang = 'en';
  isDeletedImg = false;
  extractedInfo: ExtractedMobile | null = null;
  temp_mobile_number = '';

  // image upload
  tempImg: any = [];
  delImgObj: any = { file_name: '' };
  tempData: any = [];

  // subscriptions
  private keyboardShowSub: any;
  private keyboardHideSub: any;

  constructor(
    private zone: NgZone,
    private fileTransfer: FileTransfer,
    private camera: Camera,
    private keyboard: Keyboard,
    private popoverController: PopoverController,
    private service: ServicesService,
    private loadingScreen: LoadingScreenAppPage,
    private navController: NavController,
    private modalCtrl: ModalController,
    private translate: TranslateService
  ) {}

  // ---------- Lifecycle ----------
  ngOnInit(): void {
    this.initKeyboardListeners();
    this.loadCountries();
  }

  ngOnDestroy(): void {
    try {
      this.keyboardShowSub?.unsubscribe?.();
      this.keyboardHideSub?.unsubscribe?.();
    } catch (e) {
      // ignore
    }
  }

  private initKeyboardListeners(): void {
    try {
      // hide accessory bar setting (if applicable)
      this.keyboard.hideFormAccessoryBar(false);

      this.keyboardShowSub = this.keyboard.onKeyboardWillShow().subscribe(() => {
        this.adjustScroll(true);
      });
      this.keyboardHideSub = this.keyboard.onKeyboardWillHide().subscribe(() => {
        this.adjustScroll(false);
      });
    } catch (err) {
      console.warn('Keyboard plugin not available or failed to initialize:', err);
    }
  }

  // ---------- Country loading & phone handling ----------
  async loadCountries(): Promise<void> {
    try {
      const response: any = await this.service.listOfCountriesForResidence();
      if (response?.status === 200 && Array.isArray(response.data)) {
        this.countryList = response.data as Country[];
        // initialize country code based on saved value or default
        this.initializeCountryCodeFromStorage();
        this.isData =false;
        // load user details from localStorage
        this.loadProfileFromStorage();
      } else {
        console.warn('Unexpected response structure while loading countries:', response);
        this.countryList = [];
        this.isData =false;
      }
    } catch (error) {
      console.error('Error fetching list of countries:', error);
      this.countryList = [];
      this.isData =false;
    }
  }

  private initializeCountryCodeFromStorage(): void {
    const storedPhoneCode = window.localStorage.getItem('L2TraveleSIM_phone_code');
    console.log("storedPhoneCode" + storedPhoneCode);
    if (storedPhoneCode) {
      this.countryCodeObj.code = storedPhoneCode;
      const iso = this.getCountryISO(this.countryCodeObj.code);
      this.countryCodeObj.iso = iso || 'en';
      this.countryCodeObj.flag = iso || 'en';
    } else {
      this.countryCodeObj.flag = 'en';
      this.countryCodeObj.code = '+44';
      this.countryCodeObj.iso = 'en';
    }
  }

  private loadProfileFromStorage(): void {
    const raw = window.localStorage.getItem('L2TraveleSIM_userDetails');
    try {
      this.tempDetails = raw ? JSON.parse(raw) : null;
    } catch (e) {
      this.tempDetails = null;
    }

    this.token = window.localStorage.getItem('L2TraveleSIM_auth_token') || '';

  

    if (this.tempDetails) {
      this.profileObj.first_name = this.tempDetails.first_name || '';
      this.profileObj.profile_image = this.tempDetails.profile_image || '';
      this.profileObj.country_name = this.tempDetails.country_name || '';
      this.isDeletedImg = !!(this.profileObj.profile_image && this.profileObj.profile_image.includes('user-theme.png'));
      this.lang = window.localStorage.getItem('L2TraveleSIM_language') || 'en';

      // Guest name handling
      if (this.profileObj.first_name && this.profileObj.first_name.toLowerCase() === 'guest') {
        this.profileObj.first_name = this.lang === 'nl' ? 'Gast' : 'Guest';
      }

      this.profileObj.last_name = this.tempDetails.last_name || '';
      this.profileObj.email = this.tempDetails.email || '';
      this.profileObj.date_of_birth = this.tempDetails.date_of_birth == null ? '' : this.formatDate(this.tempDetails.date_of_birth);
      this.profileObj.mobile_number = this.tempDetails.mobile_number == null ? '' : this.tempDetails.mobile_number;

        console.log(this.profileObj.mobile_number);
        
      // Extract mobile number parts if mobile exists
      if (this.profileObj.mobile_number) {
        this.extractedInfo = this.extractMobileNumber(this.profileObj.mobile_number);
        if (this.extractedInfo) {
          this.countryCodeObj.code = this.extractedInfo.countryCode;
          window.localStorage.setItem('L2TraveleSIM_phone_code', this.countryCodeObj.code);
          this.countryCodeObj.flag = this.extractedInfo.iso;
          this.countryCodeObj.iso = this.extractedInfo.iso;
          this.temp_mobile_number = this.extractedInfo.number;
        } else {
          // if extraction failed, keep full number in temp_mobile_number
          this.temp_mobile_number = this.profileObj.mobile_number;
        }
      }
    }
  }

  getCountryISO(phoneCode: string | undefined | null): string | null {
    if (!phoneCode) return null;
    const formattedCode = phoneCode.toString().startsWith('+') ? phoneCode.toString() : `+${phoneCode}`;

    const country = this.countryList.find((c) => c.phone_code === formattedCode);
    return country ? country.short_name : null;
  }

  extractMobileNumber(mobileNumber: string): ExtractedMobile | null {
    if (!mobileNumber) return null;
    // attempt to match longest phone_code first (sort by length desc)
    const sortedCountries = [...this.countryList].sort((a, b) => b.phone_code.length - a.phone_code.length);
    for (const country of sortedCountries) {
      if (!country.phone_code) continue;
      if (mobileNumber.startsWith(country.phone_code)) {
        const number = mobileNumber.replace(country.phone_code, '');
        return {
          countryCode: country.phone_code,
          iso: country.short_name,
          number,
        };
      }
    }
    // No matching prefix found
    return null;
  }

  // ---------- UI helpers ----------
  private adjustScroll(shouldScroll: boolean): void {
    setTimeout(() => {
      if (shouldScroll) {
        this.content?.scrollToPoint(0, 200, 200);
      } else {
        this.content?.scrollToTop(200);
      }
    }, 300);
  }

  onSearch(event: Event): void {
    this.adjustScroll(true);
    const input = event.target as HTMLInputElement;
    if (!input) return;
    const digitsOnly = (input.value || '').replace(/\D/g, '');
    input.value = digitsOnly;
    this.temp_mobile_number = digitsOnly;
  }

  validateName(event: any, type: 'first' | 'last'): void {
    const inputValue = (event?.target?.value || '').toString();
    const cleaned = inputValue.replace(/\d/g, '');
    event.target.value = cleaned;
    if (type === 'first') {
      this.profileObj.first_name = cleaned;
    } else {
      this.profileObj.last_name = cleaned;
    }
  }

  formatDate(date: string): string {
    // Expecting date in a known pattern like YYYY-MM-DD or similar; existing logic assumed dd-mm-yyyy reorder
    if (!date) return '';
    const parts = date.split('-');
    if (parts.length === 3) {
      // If original is YYYY-MM-DD, moment will parse directly. But to keep original behavior:
      const correctedDateString = `${parts[0]}-${parts[2]}-${parts[1]}`;
      return moment(correctedDateString).format('DD-MM-YYYY');
    }
    // fallback
    return moment(date).format('DD-MM-YYYY');
  }

  // ---------- Modals ----------
  async chooseCountry(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: CountryCodeModelPage,
      componentProps: { value: this.countryList },
    });

    modal.onDidDismiss().then((result: any) => {
      if (result?.data?.data) {
        this.countryCodeObj.code = result.data.data.phone_code;
        this.countryCodeObj.flag = result.data.data.short_name;
        this.countryCodeObj.iso = result.data.data.short_name;
      }
    });

    await modal.present();
  }

  async gotoDeletepic(): Promise<void> {
    const modal = await this.modalCtrl.create({ component: ModalDeleteprofilepicPage });
    modal.onDidDismiss().then((result) => {
      if (result?.data) {
        if (result.data.action === 'deletePhoto') {
          this.delPhoto();
        }
      }
    });
    await modal.present();
  }

  async gotoUpload(): Promise<void> {
    const modal = await this.modalCtrl.create({ component: ModalUploadProfileImagePage });
    modal.onDidDismiss().then((result) => {
      if (result?.data) {
        if (result.data.action === 'choose_photo') {
          this.photoGallery();
        } else if (result.data.action === 'take_photo') {
          this.takePicture();
        }
      }
    });
    await modal.present();
  }

  // ---------- Image handling ----------
  private photoGallery(): void {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        if (this.validateImageSize(imageData)) {
          this.correctImageOrientation(imageData, (correctedImage) => {
            this.uploadPhotoToServer(correctedImage);
          });
        } else {
          this.errorMSGModal(this.translate.instant('TRY_AGAIN'), this.translate.instant('Update profile picture (10MB max)'));
        }
      },
      (err) => {
        this.errorMSGModal(this.translate.instant('TRY_AGAIN'), JSON.stringify(err));
        console.log('Camera Error: ', err);
      }
    );
  }

  private takePicture(): void {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        if (this.validateImageSize(imageData)) {
          this.correctImageOrientation(imageData, (correctedImage) => {
            this.uploadPhotoToServer(correctedImage);
          });
        } else {
          this.errorMSGModal(this.translate.instant('TRY_AGAIN'), this.translate.instant('Update profile picture (10MB max)'));
        }
      },
      (err) => {
        this.errorMSGModal(this.translate.instant('TRY_AGAIN'), JSON.stringify(err));
        console.log('Camera Error: ', err);
      }
    );
  }

  private correctImageOrientation(base64Image: string, callback: (imageUrl: string) => void): void {
    try {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          console.error('Canvas context unavailable');
          callback(base64Image);
          return;
        }
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        callback(canvas.toDataURL('image/jpeg'));
      };
      img.src = base64Image;
    } catch (err) {
      console.error('Error correcting image orientation:', err);
      callback(base64Image);
    }
  }

  validateImageSize(imageData: string): boolean {
    if (!imageData) return false;
    let base64Data = imageData;
    if (imageData.indexOf('data:image') === 0) {
      base64Data = imageData.split(',')[1];
    }
    const fileSizeInBytes = Math.round((base64Data.length * 3) / 4);
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    console.log(`Calculated file size: ${fileSizeInBytes} bytes`);
    return fileSizeInBytes <= maxFileSize;
  }

  private async uploadPhotoToServer(imgBase64: string): Promise<void> {
    await this.loadingScreen.presentLoading();
    try {
      const fileTransferObj: FileTransferObject = this.fileTransfer.create();
      const options: FileUploadOptions = {
        fileKey: 'image',
        fileName: 'imageName.jpg',
        chunkedMode: false,
        mimeType: 'image/jpeg',
        headers: {
          whitelabel: this.service.whiteLabelId,
          'client-token': this.service.clientToken,
          Authorization: 'Bearer ' + this.token,
        },
      };

      const endpoint = this.service.restAPI + 'upload/profile/image';
      const data: any = await fileTransferObj.upload(imgBase64, endpoint, options);
      this.tempImg = JSON.parse(data.response);

      if (this.tempImg?.code === 200 && Array.isArray(this.tempImg.data) && this.tempImg.data[0]?.data) {
        window.localStorage.setItem('L2TraveleSIM_userDetails', JSON.stringify(this.tempImg.data[0].data));
        this.tempData = JSON.parse(localStorage.getItem('L2TraveleSIM_userDetails') || '{}');
        this.profileObj.profile_image = this.tempImg.data[0].profile_image || this.profileObj.profile_image;
        this.loadingScreen.dismissLoading();
        this.successMSGModal(this.translate.instant('profile_image_uploaded'), this.translate.instant('profile_image'), '2000');
      } else {
        this.loadingScreen.dismissLoading();
        this.errorMSGModal(this.translate.instant('TRY_AGAIN'), this.translate.instant('unable_to_upload_image'));
      }
    } catch (err) {
      console.error('Upload Error: ', err);
      this.loadingScreen.dismissLoading();
      this.errorMSGModal(this.translate.instant('TRY_AGAIN'), this.translate.instant('SOMETHING_WENT_WRONG'));
    }
  }

  // ---------- Delete photo ----------
  async delPhoto(): Promise<void> {
    this.delImgObj.file_name = this.profileObj.profile_image;
    await this.loadingScreen.presentLoading();
    try {
      const res: any = await this.service.delPhoto(this.delImgObj, this.token);
      this.loadingScreen.dismissLoading();

      if (res && res.code === 200 && Array.isArray(res.data) && res.data[0]?.data) {
        window.localStorage.setItem('L2TraveleSIM_userDetails', JSON.stringify(res.data[0].data));
        this.tempData = JSON.parse(localStorage.getItem('L2TraveleSIM_userDetails') || '{}');
        this.profileObj.profile_image = this.tempData.profile_image;
        this.isDeletedImg = this.profileObj.profile_image?.includes('user-theme.png') ?? false;

        this.successMSGModal(
          this.translate.instant('profile_image_deleted_success'),
          this.translate.instant('profile_image_deleted'),
          '2000'
        );
      } else {
        this.errorMSGModal(this.translate.instant('TRY_AGAIN'), this.translate.instant('Deletion Failed'));
      }
    } catch (err) {
      console.error('Error deleting photo:', err);
      this.loadingScreen.dismissLoading();
      this.errorMSGModal(this.translate.instant('TRY_AGAIN'), this.translate.instant('SOMETHING_WENT_WRONG'));
    }
  }

  // ---------- Submit / validation ----------
  async submit(): Promise<void> {
    if (!this.validate()) return;
    await this.loadingScreen.presentLoading();
    try {
      if (this.isSavedDetails) {
        window.localStorage.setItem('L2TraveleSIM_isSavedDetails', this.profileObj.first_name);
      } else {
        window.localStorage.setItem('L2TraveleSIM_isSavedDetails', '');
      }

      this.profileObj.mobile_number = `${this.countryCodeObj.code}${this.temp_mobile_number}`;

      const res: any = await this.service.updateProfile(this.profileObj, this.token);
      this.loadingScreen.dismissLoading();

      if (res?.code === 200 && Array.isArray(res.data)) {
        const data0 = res.data[0] || {};
        const userData = data0.data || {};
        window.localStorage.setItem('L2TraveleSIM_userDetails', JSON.stringify(userData));
        window.localStorage.setItem('L2TraveleSIM_auth_token', data0.token || '');
        window.localStorage.setItem('L2TraveleSIM_loginType', 'normal');
        window.localStorage.setItem('L2TraveleSIM_emailSettings', data0.promotion_email || '');
        window.localStorage.setItem('L2TraveleSIM_promoSettings', data0.app_promotions || '');
        window.localStorage.setItem('L2TraveleSIM_paymentSettings', data0.app_payment || '');
        window.localStorage.setItem('L2TraveleSIM_serviceSettings', data0.app_service || '');

        this.successMSGModal(this.translate.instant('PROFILE_UPDATED_SUCCESSFULLY'), this.translate.instant('PROFILE_UPDATE'), '2000');
        this.navController.pop();
      } else {
        this.errorMSGModal(this.translate.instant('TRY_AGAIN'), res?.message || '');
      }
    } catch (err) {
      console.error('Update profile error:', err);
      this.loadingScreen.dismissLoading();
      this.errorMSGModal(this.translate.instant('TRY_AGAIN'), this.translate.instant('SOMETHING_WENT_WRONG'));
    }
  }

  validate(): boolean {
    const emailValid = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!this.profileObj.first_name?.trim()) {
      this.errorMSGModal(this.translate.instant('OK'), this.translate.instant('PLEASE_ENTER_FIRST_NAME'));
      return false;
    }

    if (!this.profileObj.last_name?.trim()) {
      this.errorMSGModal(this.translate.instant('OK'), this.translate.instant('PLEASE_ENTER_SURNAME'));
      return false;
    }

    if (!this.profileObj.email?.trim()) {
      this.errorMSGModal(this.translate.instant('OK'), this.translate.instant('PLEASE_ENTER_EMAIL'));
      return false;
    }

    if (!emailValid.test(this.profileObj.email)) {
      this.errorMSGModal(this.translate.instant('OK'), this.translate.instant('PLEASE_ENTER_VALID_EMAIL'));
      return false;
    }

      // ---- MOBILE NUMBER (libphonenumber) ----
    if (!this.temp_mobile_number || this.temp_mobile_number.trim() === '') {
      this.errorMSGModal(this.translate.instant('OK'), this.translate.instant('VALIDATION_MSG_ENTER_MOBILE_NUMBER'));
      return false;
    }

  try {
    const phoneUtil = PhoneNumberUtil.getInstance();
    const rawInput = this.temp_mobile_number.trim();

    // Ensure number has '+' and country code
    let cleaned = rawInput.startsWith('+')
      ? rawInput
      : `+${this.countryCodeObj.code.replace('+', '')}${rawInput.replace(/[^\d]/g, '')}`;

    const parsedNumber = phoneUtil.parseAndKeepRawInput(cleaned);

    if (phoneUtil.isValidNumber(parsedNumber)) {
      this.profileObj.mobile_number = phoneUtil.format(parsedNumber, PhoneNumberFormat.E164);
    } else {
      throw new Error('Invalid mobile number');
    }
  } catch (err) {
    console.error('Mobile validation error:', err);
    this.errorMSGModal(
      this.translate.instant('OK'),
      this.translate.instant('VALIDATION_MSG_ENTER_VALID_MOBILE_NUMBER')
    );
    return false;
  }


    // Additional required checks (DOB, mobile) were commented out in original; keep the same behavior
    return true;
  }

  // ---------- navigation helpers ----------
  gotoBack(): void {
    this.navController.pop();
  }

  gotoHomeSearch(): void {
    this.navController.navigateRoot('home-search');
  }

  gotoTab1(): void {
    this.navController.navigateRoot('tab1');
  }

  gotoMarketPlace(): void {
    this.navController.navigateRoot('marketplace');
  }

  gotoTab5(): void {
    if (!window.localStorage.getItem('L2TraveleSIM_auth_token')) {
      this.navController.navigateRoot('tab5');
    } else {
      this.navController.navigateRoot('profile');
    }
  }

  // ---------- message modals ----------
  async errorMSGModal(buttonText: any, msg: any): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: PasswordErrorPage,
      componentProps: { value: msg, value1: buttonText },
    });
    await modal.present();
  }

  async successMSGModal(buttonText: any, msg: any, times: any): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: SuccessModelPage,
      componentProps: { value: msg, value1: buttonText, value2: times },
    });
    await modal.present();
  }
}

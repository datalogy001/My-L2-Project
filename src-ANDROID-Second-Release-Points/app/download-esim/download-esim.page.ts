import { Component, OnInit, Input } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { NavController,Platform , ToastController, AlertController, PopoverController, ModalController, LoadingController } from "@ionic/angular";
import { HttpClient } from '@angular/common/http';
import { ServicesService } from '../api/services.service';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';


@Component({
  selector: 'app-download-esim',
  templateUrl: './download-esim.page.html',
  styleUrls: ['./download-esim.page.scss'],
})

export class DownloadEsimPage implements OnInit {

  @Input("value") value: any;
  @Input("value1") value1: any;

  iccid: any;
  qrCodeUrl: any;
  fileName: any;
  fileData:any=[];
  ngOnInit() {
    this.iccid = this.value;
    this.qrCodeUrl = this.value1;
    // Get the current date and time
    const currentDateTime: Date = new Date();

    // Format the date and time to create a timestamp
    const timestamp: string = `${currentDateTime.getFullYear()}${(currentDateTime.getMonth() + 1).toString().padStart(2, '0')}${currentDateTime.getDate().toString().padStart(2, '0')}_${currentDateTime.getHours().toString().padStart(2, '0')}${currentDateTime.getMinutes().toString().padStart(2, '0')}${currentDateTime.getSeconds().toString().padStart(2, '0')}`;
    this.fileName = this.value +timestamp+ ".png";
    
  }
  constructor(private alertController:AlertController, private fileOpener: FileOpener,private fileTransfer: FileTransfer, private service: ServicesService, private platform: Platform,  private http: HttpClient,  private modalCtrl: ModalController, private toastController: ToastController, /*private fileTransfer: FileTransfer,*/ private file: File) { }

  async downloadQrCode() {

    if (window.localStorage.getItem('storagePrompt') == null) {

      const alert = await this.alertController.create({
          header: 'Storage Access',
          message: 'TravelRoam App needs access to phone storage to download the eSIM QR code.',
          buttons: [
              {
                  text: 'Deny',
                  role: 'cancel',
                  handler: () => {
                      console.log('Permission Denied');
                  }
              },
              {
                  text: 'Allow',
                  handler: () => {
                      window.localStorage.setItem("storagePrompt", '123456');
                      const imageUrl = this.qrCodeUrl;
                      const fileName = this.fileName;
                      const targetFilePath = this.file.dataDirectory  + 'Download/'+ fileName;
                      this.downloadImage(imageUrl, fileName);
                  }
              }
          ]
      });

      await alert.present();
  } else {
    const imageUrl = this.qrCodeUrl;
    const fileName = this.fileName;
    const targetFilePath = this.file.dataDirectory  + 'Download/'+ fileName;
    this.downloadImage(imageUrl, fileName);
  }

        
  }

  downloadImage(imageUrl: string, fileName: string) {
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
      const downloadPath = this.file.dataDirectory  + 'Download/'+ fileName;
    fileTransfer.download(imageUrl, downloadPath).then(
      (entry) => {
        const fileType = 'image/png'; // Specify the MIME type for PNG files
        this.fileOpener.open(downloadPath, fileType)
    .then(() => this.presentToast('eSIM QR code downloaded', "Success"))
    .catch(error => this.presentToast('Error opening file' , "Error"))
        this.modalCtrl.dismiss();
      },
      (error) => {
       this.presentToast('Error downloading image', "Error");
      }
    ); 
  }  

  closePopover() {
    this.modalCtrl.dismiss();
  }



  copyICCID() {
    const inputElement = document.createElement('input');
    inputElement.value = this.iccid;
    document.body.appendChild(inputElement);
    inputElement.select();
    document.execCommand('copy');
    document.body.removeChild(inputElement);

    this.presentToast('ICCID copied to clipboard', "Success");
  }

  async presentToast(msg: any, status: any) {
    const toast = await this.toastController.create({
      header: status,
      message: msg,
      duration: status == 'Error' ? 2000 : 3000,
      position: 'top',
      cssClass: status == 'Error' ? 'error-toast' : 'success-toast'
    });

    await toast.present();
  }

}
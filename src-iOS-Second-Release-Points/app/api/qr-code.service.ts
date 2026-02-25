import { Injectable } from '@angular/core';
import * as QRCode from 'qrcode';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor() { }

  async generateQRCode(text: string): Promise<string> {
    try {
      const qrCodeDataURL = await QRCode.toDataURL(text);
      return qrCodeDataURL;
    } catch (err) {
      console.error('Error generating QR code:', err);
      throw err;
    }
  }

}

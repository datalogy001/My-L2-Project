import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ServicesService } from './api/services.service';
import { register } from 'swiper/element/bundle';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, NavController, ModalController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { PushNotificationPage } from '../app/push-notification/push-notification.page'
import OneSignalPlugin from 'onesignal-cordova-plugin'
import { Network } from '@ionic-native/network/ngx';

import axios from 'axios';
import { NointernetPage } from '../app/nointernet/nointernet.page';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from './api/constants.enum';
import { Market } from '@ionic-native/market/ngx';
import { UpdateAppPage } from '../app/update-app/update-app.page'
import { Device } from '@ionic-native/device/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';
import { SocailLoginCountryPhonePage } from '../app/socail-login-country-phone/socail-login-country-phone.page';
import { SuccessModelPage } from '../app/success-model/success-model.page';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  result: any = '';
  rate: any = '';
  exchangeRates: any = [];
  response: any = '';
  tempAllCountry: any = [];
  todaysDate: any = '';
  uniqueObjects: any = [];
  temp: any = '';
  playerIds: any = '';
  pushDBToken: any = { 'deviceToken': '', 'userid': '' };
  isDeletedObj: any = { 'user_id': '' };
  tempArr: any = [];
  authToken: any;
  userDetails: any = [];
  noInternetAlert: any;
  countryParam: any = { 'to_currency': '' };
  zoneList: any = [{ 'name': 'Africa', 'perDay': '' }, { 'name': 'Asia', 'perDay': '' }, { 'name': 'Europe', 'perDay': '' }, { 'name': 'Global', 'perDay': '' }, { 'name': 'Middle East', 'perDay': '' }
    , { 'name': 'North America', 'perDay': '' }, { 'name': 'Oceania', 'perDay': '' }];
  currencyList: any = ['USD', 'GBP', 'EUR','LYD'];


  countryListWithCodes = [
    { "country": "Afghanistan", "code": "AF", "currency": "AFN", "language": "en", "phone_code_country": "+93" },
    { "country": "Albania", "code": "AL", "currency": "ALL", "language": "en", "phone_code_country": "+355" },
    { "country": "Algeria", "code": "DZ", "currency": "DZD", "language": "en", "phone_code_country": "+213" },
    { "country": "American Samoa", "code": "AS", "currency": "USD", "language": "en", "phone_code_country": "+1-684" },
    { "country": "Andorra", "code": "AD", "currency": "EUR", "language": "en", "phone_code_country": "+376" },
    { "country": "Angola", "code": "AO", "currency": "AOA", "language": "en", "phone_code_country": "+244" },
    { "country": "Anguilla", "code": "AI", "currency": "XCD", "language": "en", "phone_code_country": "+1-264" },
    { "country": "Antarctica", "code": "AQ", "currency": "", "language": "en", "phone_code_country": "N/A" },
    { "country": "Antigua And Barbuda", "code": "AG", "currency": "XCD", "language": "en", "phone_code_country": "+1-268" },
    { "country": "Argentina", "code": "AR", "currency": "ARS", "language": "en", "phone_code_country": "+54" },
    { "country": "Armenia", "code": "AM", "currency": "AMD", "language": "en", "phone_code_country": "+374" },
    { "country": "Aruba", "code": "AW", "currency": "AWG", "language": "en", "phone_code_country": "+297" },
    { "country": "Australia", "code": "AU", "currency": "AUD", "language": "en", "phone_code_country": "+61" },
    { "country": "Austria", "code": "AT", "currency": "EUR", "language": "en", "phone_code_country": "+43" },
    { "country": "Azerbaijan", "code": "AZ", "currency": "AZN", "language": "en", "phone_code_country": "+994" },
    { "country": "Bahamas The", "code": "BS", "currency": "BSD", "language": "en", "phone_code_country": "+1-242" },
    { "country": "Bahrain", "code": "BH", "currency": "BHD", "language": "en", "phone_code_country": "+973" },
    { "country": "Bangladesh", "code": "BD", "currency": "BDT", "language": "en", "phone_code_country": "+880" },
    { "country": "Barbados", "code": "BB", "currency": "BBD", "language": "en", "phone_code_country": "+1-246" },
    { "country": "Belarus", "code": "BY", "currency": "BYN", "language": "en", "phone_code_country": "+375" },
    { "country": "Belgium", "code": "BE", "currency": "EUR", "language": "en", "phone_code_country": "+32" },
    { "country": "Belize", "code": "BZ", "currency": "BZD", "language": "en", "phone_code_country": "+501" },
    { "country": "Benin", "code": "BJ", "currency": "XOF", "language": "en", "phone_code_country": "+229" },
    { "country": "Bermuda", "code": "BM", "currency": "BMD", "language": "en", "phone_code_country": "+1-441" },
    { "country": "Bhutan", "code": "BT", "currency": "BTN", "language": "en", "phone_code_country": "+975" },
    { "country": "Bolivia", "code": "BO", "currency": "BOB", "language": "en", "phone_code_country": "+591" },
    { "country": "Bosnia and Herzegovina", "code": "BA", "currency": "BAM", "language": "en", "phone_code_country": "+387" },
    { "country": "Botswana", "code": "BW", "currency": "BWP", "language": "en", "phone_code_country": "+267" },
    { "country": "Bouvet Island", "code": "BV", "currency": "NOK", "language": "en", "phone_code_country": "N/A" },
    { "country": "Brazil", "code": "BR", "currency": "BRL", "language": "en", "phone_code_country": "+55" },
    { "country": "British Indian Ocean Territory", "code": "IO", "currency": "USD", "language": "en", "phone_code_country": "+246" },
    { "country": "Brunei", "code": "BN", "currency": "BND", "language": "en", "phone_code_country": "+673" },
    { "country": "Bulgaria", "code": "BG", "currency": "BGN", "language": "en", "phone_code_country": "+359" },
    { "country": "Burkina Faso", "code": "BF", "currency": "XOF", "language": "en", "phone_code_country": "+226" },
    { "country": "Burundi", "code": "BI", "currency": "BIF", "language": "en", "phone_code_country": "+257" },
    { "country": "Cambodia", "code": "KH", "currency": "KHR", "language": "en", "phone_code_country": "+855" },
    { "country": "Cameroon", "code": "CM", "currency": "XAF", "language": "en", "phone_code_country": "+237" },
    { "country": "Canada", "code": "CA", "currency": "CAD", "language": "en", "phone_code_country": "+1" },
    { "country": "Cape Verde", "code": "CV", "currency": "CVE", "language": "en", "phone_code_country": "+238" },
    { "country": "Cayman Islands", "code": "KY", "currency": "KYD", "language": "en", "phone_code_country": "+1-345" },
    { "country": "Central African Republic", "code": "CF", "currency": "XAF", "language": "en", "phone_code_country": "+236" },
    { "country": "Chad", "code": "TD", "currency": "XAF", "language": "en", "phone_code_country": "+235" },
    { "country": "Chile", "code": "CL", "currency": "CLP", "language": "en", "phone_code_country": "+56" },
    { "country": "China", "code": "CN", "currency": "CNY", "language": "en", "phone_code_country": "+86" },
    { "country": 'Christmas Island', "code": 'CX', "currency": 'AUD', "language": 'en', "phone_code_country": '+61' },
    { "country": 'Cocos [Keeling] Islands', "code": 'CC', "currency": 'AUD', "language": 'en', "phone_code_country": '+61' },
    { "country": 'Colombia', "code": 'CO', "currency": 'COP', "language": 'en', "phone_code_country": '+57' },
    { "country": 'Comoros', "code": 'KM', "currency": 'KMF', "language": 'en', "phone_code_country": '+269' },
    { "country": 'Republic Of The Congo', "code": 'CG', "currency": 'XAF', "language": 'en', "phone_code_country": '+242' },
    { "country": 'Democratic Republic Of The Congo', "code": 'CD', "currency": 'CDF', "language": 'en', "phone_code_country": '+243' },
    { "country": 'Cook Islands', "code": 'CK', "currency": 'NZD', "language": 'en', "phone_code_country": '+682' },
    { "country": 'Costa Rica', "code": 'CR', "currency": 'CRC', "language": 'en', "phone_code_country": '+506' },
    { "country": "Cote D'Ivoire [Ivory Coast]", "code": 'CI', "currency": 'XOF', "language": 'en', "phone_code_country": '+225' },
    { "country": 'Croatia [Hrvatska]', "code": 'HR', "currency": 'HRK', "language": 'en', "phone_code_country": '+385' },
    { "country": 'Cuba', "code": 'CU', "currency": 'CUP', "language": 'en', "phone_code_country": '+53' },
    { "country": 'Cyprus', "code": 'CY', "currency": 'TRY', "language": 'en', "phone_code_country": '+357' },
    { "country": 'Czech Republic', "code": 'CZ', "currency": 'CZK', "language": 'en', "phone_code_country": '+420' },
    { "country": 'Denmark', "code": 'DK', "currency": 'DKK', "language": 'en', "phone_code_country": '+45' },
    { "country": 'Djibouti', "code": 'DJ', "currency": 'DJF', "language": 'en', "phone_code_country": '+253' },
    { "country": 'Dominica', "code": 'DM', "currency": 'XCD', "language": 'en', "phone_code_country": '+1-767' },
    { "country": 'Dominican Republic', "code": 'DO', "currency": 'DOP', "language": 'en', "phone_code_country": '+1-809' },
    { "country": 'East Timor', "code": 'TL', "currency": 'USD', "language": 'en', "phone_code_country": '+670' },
    { "country": 'Ecuador', "code": 'EC', "currency": 'USD', "language": 'en', "phone_code_country": '+593' },
    { "country": 'Egypt', "code": 'EG', "currency": 'EGP', "language": 'en', "phone_code_country": '+20' },
    { "country": 'El Salvador', "code": 'SV', "currency": 'USD', "language": 'en', "phone_code_country": '+503' },
    { "country": 'Equatorial Guinea', "code": 'GQ', "currency": 'XAF', "language": 'en', "phone_code_country": '+240' },
    { "country": 'Eritrea', "code": 'ER', "currency": 'ERN', "language": 'en', "phone_code_country": '+291' },
    { "country": 'Estonia', "code": 'EE', "currency": 'EUR', "language": 'en', "phone_code_country": '+372' },
    { "country": 'Ethiopia', "code": 'ET', "currency": 'ETB', "language": 'en', "phone_code_country": '+251' },
    { "country": 'External Territories of Australia', "code": 'XA', "currency": '', "language": 'en', "phone_code_country": '' },
    { "country": 'Falkland Islands', "code": 'FK', "currency": 'FKP', "language": 'en', "phone_code_country": '+500' },
    { "country": 'Faroe Islands', "code": 'FO', "currency": 'DKK', "language": 'en', "phone_code_country": '+298' },
    { "country": 'Fiji Islands', "code": 'FJ', "currency": 'FJD', "language": 'en', "phone_code_country": '+679' },
    { "country": 'Finland', "code": 'FI', "currency": 'EUR', "language": 'en', "phone_code_country": '+358' },
    { "country": 'France', "code": 'FR', "currency": 'EUR', "language": 'fr', "phone_code_country": '+33' },
    { "country": 'French Guiana', "code": 'GF', "currency": 'EUR', "language": 'en', "phone_code_country": '+594' },
    { "country": 'French Polynesia', "code": 'PF', "currency": 'XPF', "language": 'en', "phone_code_country": '+689' },
    { "country": 'French Southern Territories', "code": 'TF', "currency": 'EUR', "language": 'en', "phone_code_country": '' },
    { "country": 'Gabon', "code": 'GA', "currency": 'XAF', "language": 'en', "phone_code_country": '+241' },
    { "country": 'Gambia The', "code": 'GM', "currency": 'GMD', "language": 'en', "phone_code_country": '+220' },
    { "country": 'Georgia', "code": 'GE', "currency": 'GEL', "language": 'en', "phone_code_country": '+995' },
    { "country": 'Germany', "code": 'DE', "currency": 'EUR', "language": 'en', "phone_code_country": '+49' },
    { "country": 'Ghana', "code": 'GH', "currency": 'GHS', "language": 'en', "phone_code_country": '+233' },
    { "country": 'Gibraltar', "code": 'GI', "currency": 'GIP', "language": 'en', "phone_code_country": '+350' },
    { "country": 'Greece', "code": 'GR', "currency": 'EUR', "language": 'en', "phone_code_country": '+30' },
    { "country": 'Greenland', "code": 'GL', "currency": 'DKK', "language": 'en', "phone_code_country": '+299' },
    { "country": 'Grenada', "code": 'GD', "currency": 'XCD', "language": 'en', "phone_code_country": '+1-473' },
    { "country": 'Guadeloupe', "code": 'GP', "currency": 'EUR', "language": 'en', "phone_code_country": '+590' },
    { "country": 'Guam', "code": 'GU', "currency": 'USD', "language": 'en', "phone_code_country": '+1-671' },
    { "country": 'Guatemala', "code": 'GT', "currency": 'GTQ', "language": 'en', "phone_code_country": '+502' },
    { "country": 'Guernsey and Alderney', "code": 'XU', "currency": 'GBP', "language": 'en', "phone_code_country": '+44' },
    { "country": 'Guinea', "code": 'GN', "currency": 'GNF', "language": 'en', "phone_code_country": '+224' },
    { "country": 'Guinea-Bissau', "code": 'GW', "currency": 'XOF', "language": 'en', "phone_code_country": '+245' },
    { "country": 'Guyana', "code": 'GY', "currency": 'GYD', "language": 'en', "phone_code_country": '+592' },
    { "country": 'Haiti', "code": 'HT', "currency": 'HTG', "language": 'en', "phone_code_country": '+509' },
    { "country": 'Heard and McDonald Islands', "code": 'HM', "currency": 'AUD', "language": 'en', "phone_code_country": '' },
    { "country": 'Honduras', "code": 'HN', "currency": 'HNL', "language": 'en', "phone_code_country": '+504' },
    { "country": 'Hong Kong S.A.R.', "code": 'HK', "currency": 'HKD', "language": 'en', "phone_code_country": '+852' },
    { "country": 'Hungary', "code": 'HU', "currency": 'HUF', "language": 'en', "phone_code_country": '+36' },
    { "country": 'Iceland', "code": 'IS', "currency": 'ISK', "language": 'en', "phone_code_country": '+354' },
    { "country": 'India', "code": 'IN', "currency": 'INR', "language": 'en', "phone_code_country": '+91' },
    { "country": 'Indonesia', "code": 'ID', "currency": 'IDR', "language": 'en', "phone_code_country": '+62' },
    { "country": 'Iran', "code": 'IR', "currency": 'IRR', "language": 'en', "phone_code_country": '+98' },
    { "country": 'Iraq', "code": 'IQ', "currency": 'IQD', "language": 'en', "phone_code_country": '+964' },
    { "country": 'Ireland', "code": 'IE', "currency": 'EUR', "language": 'en', "phone_code_country": '+353' },
    { "country": 'Israel', "code": 'IL', "currency": 'ILS', "language": 'en', "phone_code_country": '+972' },
    { "country": 'Italy', "code": 'IT', "currency": 'EUR', "language": 'en', "phone_code_country": '+39' },
    { "country": 'Jamaica', "code": 'JM', "currency": 'JMD', "language": 'en', "phone_code_country": '+1-876' },
    { "country": 'Japan', "code": 'JP', "currency": 'JPY', "language": 'en', "phone_code_country": '+81' },
    { "country": 'Jersey', "code": 'XJ', "currency": 'GBP', "language": 'en', "phone_code_country": '+44-1534' },
    { "country": 'Jordan', "code": 'JO', "currency": 'JOD', "language": 'en', "phone_code_country": '+962' },
    { "country": 'Kazakhstan', "code": 'KZ', "currency": 'KZT', "language": 'en', "phone_code_country": '+7' },
    { "country": 'Kenya', "code": 'KE', "currency": 'KES', "language": 'en', "phone_code_country": '+254' },
    { "country": 'Kiribati', "code": 'KI', "currency": 'AUD', "language": 'en', "phone_code_country": '+686' },
    { "country": 'North Korea', "code": 'KP', "currency": 'KPW', "language": 'en', "phone_code_country": '+850' },
    { "country": 'South Korea', "code": 'KR', "currency": 'KRW', "language": 'en', "phone_code_country": '+82' },
    { "country": 'Kuwait', "code": 'KW', "currency": 'KWD', "language": 'en', "phone_code_country": '+965' },
    { "country": 'Kyrgyzstan', "code": 'KG', "currency": 'KGS', "language": 'en', "phone_code_country": '+996' },
    { "country": 'Laos', "code": 'LA', "currency": 'LAK', "language": 'en', "phone_code_country": '+856' },
    { "country": 'Latvia', "code": 'LV', "currency": 'EUR', "language": 'en', "phone_code_country": '+371' },
    { "country": 'Lebanon', "code": 'LB', "currency": 'LBP', "language": 'en', "phone_code_country": '+961' },
    { "country": 'Lesotho', "code": 'LS', "currency": 'LSL', "language": 'en', "phone_code_country": '+266' },
    { "country": 'Liberia', "code": 'LR', "currency": 'LRD', "language": 'en', "phone_code_country": '+231' },
    { "country": 'Libya', "code": 'LY', "currency": 'LYD', "language": 'en', "phone_code_country": '+218' },
    { "country": 'Liechtenstein', "code": 'LI', "currency": 'CHF', "language": 'en', "phone_code_country": '+423' },
    { "country": 'Lithuania', "code": 'LT', "currency": 'EUR', "language": 'en', "phone_code_country": '+370' },
    { "country": 'Luxembourg', "code": 'LU', "currency": 'EUR', "language": 'en', "phone_code_country": '+352' },
    { "country": 'Macau S.A.R.', "code": 'MO', "currency": 'MOP', "language": 'en', "phone_code_country": '+853' },
    { "country": 'Macedonia [FYROM]', "code": 'MK', "currency": 'MKD', "language": 'en', "phone_code_country": '+389' },
    { "country": 'Madagascar', "code": 'MG', "currency": 'MGA', "language": 'en', "phone_code_country": '+261' },
    { "country": 'Malawi', "code": 'MW', "currency": 'MWK', "language": 'en', "phone_code_country": '+265' },
    { "country": 'Malaysia', "code": 'MY', "currency": 'MYR', "language": 'en', "phone_code_country": '+60' },
    { "country": 'Maldives', "code": 'MV', "currency": 'MVR', "language": 'en', "phone_code_country": '+960' },
    { "country": 'Mali', "code": 'ML', "currency": 'XOF', "language": 'en', "phone_code_country": '+223' },
    { "country": 'Malta', "code": 'MT', "currency": 'EUR', "language": 'en', "phone_code_country": '+356' },
    { "country": 'Man [Isle of]', "code": 'IM', "currency": 'GBP', "language": 'en', "phone_code_country": '+44-1624' },
    { "country": 'Marshall Islands', "code": 'MH', "currency": 'USD', "language": 'en', "phone_code_country": '+692' },
    { "country": 'Martinique', "code": 'MQ', "currency": 'EUR', "language": 'en', "phone_code_country": '+596' },
    { "country": 'Mauritania', "code": 'MR', "currency": 'MRU', "language": 'en', "phone_code_country": '+222' },
    { "country": 'Mauritius', "code": 'MU', "currency": 'MUR', "language": 'en', "phone_code_country": '+230' },
    { "country": 'Mexico', "code": 'MX', "currency": 'MXN', "language": 'en', "phone_code_country": '+52' },
    { "country": 'Moldova', "code": 'MD', "currency": 'MDL', "language": 'en', "phone_code_country": '+373' },
    { "country": 'Mongolia', "code": 'MN', "currency": 'MNT', "language": 'en', "phone_code_country": '+976' },
    { "country": 'Montenegro', "code": 'ME', "currency": 'EUR', "language": 'en', "phone_code_country": '+382' },
    { "country": 'Morocco', "code": 'MA', "currency": 'MAD', "language": 'en', "phone_code_country": '+212' },
    { "country": 'Mozambique', "code": 'MZ', "currency": 'MZN', "language": 'en', "phone_code_country": '+258' },
    { "country": 'Myanmar', "code": 'MM', "currency": 'MMK', "language": 'en', "phone_code_country": '+95' },
    { "country": 'Namibia', "code": 'NA', "currency": 'NAD', "language": 'en', "phone_code_country": '+264' },
    { "country": 'Nepal', "code": 'NP', "currency": 'NPR', "language": 'en', "phone_code_country": '+977' },
    { "country": 'Netherlands', "code": 'NL', "currency": 'EUR', "language": 'en', "phone_code_country": '+31' },
    { "country": 'New Zealand', "code": 'NZ', "currency": 'NZD', "language": 'en', "phone_code_country": '+64' },
    { "country": 'Nigeria', "code": 'NG', "currency": 'NGN', "language": 'en', "phone_code_country": '+234' },
    { "country": 'Niue', "code": 'NU', "currency": 'NZD', "language": 'en', "phone_code_country": '+683' },
    { "country": 'Norfolk Island', "code": 'NF', "currency": 'AUD', "language": 'en', "phone_code_country": '+672' },
    { "country": 'Northern Mariana Islands', "code": 'MP', "currency": 'USD', "language": 'en', "phone_code_country": '+1-670' },
    { "country": 'Norway', "code": 'NO', "currency": 'NOK', "language": 'en', "phone_code_country": '+47' },
    { "country": 'Oman', "code": 'OM', "currency": 'OMR', "language": 'en', "phone_code_country": '+968' },
    { "country": 'Pakistan', "code": 'PK', "currency": 'PKR', "language": 'en', "phone_code_country": '+92' },
    { "country": 'Palau', "code": 'PW', "currency": 'USD', "language": 'en', "phone_code_country": '+680' },
    { "country": 'Palestinian Territory Occupied', "code": 'PS', "currency": 'ILS', "language": 'en', "phone_code_country": '+970' },
    { "country": 'Panama', "code": 'PA', "currency": 'PAB', "language": 'en', "phone_code_country": '+507' },
    { "country": 'Papua New Guinea', "code": 'PG', "currency": 'PGK', "language": 'en', "phone_code_country": '+675' },
    { "country": 'Paraguay', "code": 'PY', "currency": 'PYG', "language": 'en', "phone_code_country": '+595' },
    { "country": 'Peru', "code": 'PE', "currency": 'PEN', "language": 'en', "phone_code_country": '+51' },
    { "country": 'Philippines', "code": 'PH', "currency": 'PHP', "language": 'en', "phone_code_country": '+63' },
    { "country": 'Pitcairn Island', "code": 'PN', "currency": 'NZD', "language": 'en', "phone_code_country": '+64' },
    { "country": 'Poland', "code": 'PL', "currency": 'PLN', "language": 'en', "phone_code_country": '+48' },
    { "country": 'Portugal', "code": 'PT', "currency": 'EUR', "language": 'en', "phone_code_country": '+351' },
    { "country": 'Puerto Rico', "code": 'PR', "currency": 'USD', "language": 'en', "phone_code_country": '+1-787, +1-939' },
    { "country": 'Qatar', "code": 'QA', "currency": 'QAR', "language": 'en', "phone_code_country": '+974' },
    { "country": 'Reunion', "code": 'RE', "currency": 'EUR', "language": 'en', "phone_code_country": '+262' },
    { "country": 'Romania', "code": 'RO', "currency": 'RON', "language": 'en', "phone_code_country": '+40' }, // Set to Turkish
    { "country": 'Russia', "code": 'RU', "currency": 'RUB', "language": 'en', "phone_code_country": '+7' },
    { "country": 'Rwanda', "code": 'RW', "currency": 'RWF', "language": 'en', "phone_code_country": '+250' },
    { "country": 'Saint Helena', "code": 'SH', "currency": 'SHP', "language": 'en', "phone_code_country": '+290' },
    { "country": 'Saint Kitts And Nevis', "code": 'KN', "currency": 'XCD', "language": 'en', "phone_code_country": '+1-869' },
    { "country": 'Saint Lucia', "code": 'LC', "currency": 'XCD', "language": 'en', "phone_code_country": '+1-758' },
    { "country": 'Saint Vincent And The Grenadines', "code": 'VC', "currency": 'XCD', "language": 'en', "phone_code_country": '+1-784' },
    { "country": 'San Marino', "code": 'SM', "currency": 'EUR', "language": 'en', "phone_code_country": '+378' },
    { "country": 'Saudi Arabia', "code": 'SA', "currency": 'SAR', "language": 'en', "phone_code_country": '+966' },
    { "country": 'Senegal', "code": 'SN', "currency": 'XOF', "language": 'en', "phone_code_country": '+221' },
    { "country": 'Serbia', "code": 'RS', "currency": 'RSD', "language": 'en', "phone_code_country": '+381' }, // Set to Turkish
    { "country": 'Seychelles', "code": 'SC', "currency": 'SCR', "language": 'en', "phone_code_country": '+248' },
    { "country": 'Singapore', "code": 'SG', "currency": 'SGD', "language": 'en', "phone_code_country": '+65' },
    { "country": 'Slovakia', "code": 'SK', "currency": 'EUR', "language": 'en', "phone_code_country": '+421' },
    { "country": 'Slovenia', "code": 'SI', "currency": 'EUR', "language": 'en', "phone_code_country": '+386' }, // Set to Turkish
    { "country": 'South Africa', "code": 'ZA', "currency": 'ZAR', "language": 'en', "phone_code_country": '+27' },
    { "country": 'Spain', "code": 'ES', "currency": 'EUR', "language": 'en', "phone_code_country": '+34' },
    { "country": 'Sri Lanka', "code": 'LK', "currency": 'LKR', "language": 'en', "phone_code_country": '+94' },
    { "country": 'Sudan', "code": 'SD', "currency": 'SDG', "language": 'en', "phone_code_country": '+249' },
    { "country": 'Sweden', "code": 'SE', "currency": 'SEK', "language": 'en', "phone_code_country": '+46' },
    { "country": 'Switzerland', "code": 'CH', "currency": 'CHF', "language": 'en', "phone_code_country": '+41' },
    { "country": 'Thailand', "code": 'TH', "currency": 'THB', "language": 'en', "phone_code_country": '+66' },
    { "country": 'Turkey', "code": 'TR', "currency": 'TRY', "language": 'en', "phone_code_country": '+90' },
    { "country": 'United Arab Emirates', "code": 'AE', "currency": 'AED', "language": 'en', "phone_code_country": '+971' },
    { "country": 'United Kingdom', "code": 'GB', "currency": 'GBP', "language": 'en', "phone_code_country": '+44' },
    { "country": 'United States', "code": 'US', "currency": 'USD', "language": 'en', "phone_code_country": '+1' },
    { "country": 'Vietnam', "code": 'VN', "currency": 'VND', "language": 'en', "phone_code_country": '+84' },
    { "country": 'Zambia', "code": 'ZM', "currency": 'ZMW', "language": 'en', "phone_code_country": '+260' },
    { "country": 'Zimbabwe', "code": 'ZW', "currency": 'ZWL', "language": 'en', "phone_code_country": '+263' }];

  currencyCode: any;
  platformType: any = '';

  platformsObj: any =
    {
      'app_version': '',
      'app_platform': ''
    }

  constructor(private firebaseAnalytics: FirebaseAnalytics, private statusBar: StatusBar, private device: Device, private navController: NavController, private market: Market, private translate: TranslateService, private toastController: ToastController,private network: Network, private modalController: ModalController, private http: HttpClient, private alertController: AlertController, private platform: Platform, private apiService: ServicesService, private router: Router) {
    this.todaysDate = moment().format('YYYY-MM-DD');
    this.initCountry();
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#FFFFFF');

    //Check internet connection 

    if (this.platform.is('android') || this.platform.is('ios')) {
      this.detectLanguage();
      this.checkInternetConnection();
      this.getIPAddress();
    }else{
      this.detectLanguage();
      this.setDefaultCurrencyAndLanguage();
    }

    this.initApp();
    });
  
  }
  deviceLanguage: any = 'en';

  detectLanguage() {
    const supportedLanguages = ['en','ar']; // Only allow English and Arabic
    const savedLanguageStatus = window.localStorage.getItem("L2TraveleSIM_Saved_Language");
    const savedLanguage = window.localStorage.getItem("L2TraveleSIM_language");

    if (savedLanguageStatus === "Yes" || savedLanguageStatus !== null) {
      if (savedLanguage) {
        this.deviceLanguage = savedLanguage;
      } else {
        this.deviceLanguage = this.getDeviceLanguage(supportedLanguages);
        window.localStorage.setItem("L2TraveleSIM_language", this.deviceLanguage);
      }
    } else {
      this.deviceLanguage = this.getDeviceLanguage(supportedLanguages);
      window.localStorage.setItem("L2TraveleSIM_language", this.deviceLanguage);
    }

    if (this.deviceLanguage === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
  
    // Set language in translation service
    this.translate.addLangs(supportedLanguages);
  
    this.translate.setDefaultLang(this.deviceLanguage);
    this.translate.use(this.deviceLanguage);
  }

  private getDeviceLanguage(supportedLanguages: string[]): string {
    if (typeof navigator !== 'undefined' && navigator.language) {
      const langCode = navigator.language.split('-')[0].toLowerCase(); // Extract and convert to lowercase
      return supportedLanguages.includes(langCode) ? langCode : 'en';
    }
    return 'en'; // Fallback to English
  }
  




  langvalue: any;

  /* Step:1  */
  checkInternetConnection() {
    //Interner OFF 
    this.network.onDisconnect().subscribe(() => {
      this.noInternetAlertModal();
    });
    //Internet ON 
    this.network.onConnect().subscribe(() => {
      if (this.noInternetAlert) {
        this.noInternetAlert.dismiss();
        this.noInternetAlert = null;
      }
    });

  }

  async noInternetAlertModal() {
    this.noInternetAlert = await this.modalController.create({
      component: NointernetPage
    });
    this.noInternetAlert.onDidDismiss();
    return await this.noInternetAlert.present();
  }
  /*Step 1 END */

  //Step 2 Start

  initApp() {
    //Configure Push notification 
    this.platform.ready().then(() => {
      if (this.platform.is('android') || this.platform.is('ios')) {
        this.initOneSignal();
      }
    });
    //App updates popup 
    this.AppUpdatesCommonFun();
  }

  // Initialize OneSignal Push Notifications
  initOneSignal() {
    OneSignalPlugin.setAppId('fff4239f-9ac8-4b82-a715-92df7445acf6');
    OneSignalPlugin.setNotificationOpenedHandler((jsonData: any) => {
      console.log('Notification opened:', jsonData);
      let data = jsonData.notification.additionalData;
      if (data) {
        this.router.navigate(['home-search']);
      }
    });
  }





 // Example usage on app initialization
 ngOnInit() {


   this.platform.ready().then(() => {
       if (this.platform.is('android') || this.platform.is('ios')) {
      this.initFirebaseAnalytics();
      this.checkUserOpenTime();
      this.trackInactivity();
      this.trackInstallOnceApp();

       }
  });
}
 trackInstallOnceApp() {
    const installTracked = window.localStorage.getItem('user_installed_event_sent');

    if (!installTracked) {

      this.firebaseAnalytics.logEvent('user_installed_app', {})
        .then(() => {
          console.log('user_installed_app event logged to Firebase');
          window.localStorage.setItem('user_installed_event_sent', 'true');
        })
        .catch(err => {
          console.error('Error logging user_installed_app event:', err);
        });
    } else {
      console.log('user_installed_app already tracked.');
    }
  }


  inactivityTimeout: any;

  trackInactivity() {
    // Clear any previous timer
    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);
    }

    // Start 30s timer to detect inactivity
    this.inactivityTimeout = setTimeout(() => {
      this.firebaseAnalytics.logEvent('user_opened_no_action', {});
      console.log('User took no action after opening the app.');
    }, 30000); // 30 seconds

    // Define interactions that should cancel inactivity
    const resetTimer = () => {
      if (this.inactivityTimeout) {
        clearTimeout(this.inactivityTimeout);
        this.inactivityTimeout = null;
      }
    };

    // Detect basic interactions
    document.addEventListener('click', resetTimer, { once: true });
    document.addEventListener('touchstart', resetTimer, { once: true });
    document.addEventListener('scroll', resetTimer, { once: true });
  }


async initFirebaseAnalytics() {
 this.platform.ready().then(() => {
    this.firebaseAnalytics.logEvent('app_open', {})
      .then(() => {
        console.log('✅ Firebase Analytics: app_open event logged successfully');
      })
      .catch(error => {
        console.error('❌ Firebase Analytics: Failed to log app_open event', error);
      });
  });
}

 checkUserOpenTime() {
    const now = new Date().getTime(); // current timestamp in ms
    const lastOpen = parseInt(window.localStorage.getItem('last_opened_app') || '0', 10);

    if (lastOpen) {
      const hoursDiff = (now - lastOpen) / (1000 * 60 * 60); // convert ms to hours

      if (hoursDiff >= 168) {
        this.firebaseAnalytics.logEvent('user_opened_after_7d', {});
        console.log("User opened app after 7 days");
      } else if (hoursDiff >= 24) {
        this.firebaseAnalytics.logEvent('user_opened_after_24h', {});
        console.log("User opened app after 24 hours");
      }
    }

    // ✅ Always update the last opened time
    window.localStorage.setItem('last_opened_app', now.toString());
  }

  AppUpdatesCommonFun() {
   //if (this.platform.is('cordova')) {
    this.platformType = this.platform.is('ios') ? 'Ios' : 'Android';
      const APP_VERSION = this.platformType == 'Ios' ? Constants.IOS_APP_VERSION : Constants.ANDROID_APP_VERSION;
       //this.platformType = 'Android'; //static removeal
      //const APP_VERSION = Constants.ANDROID_APP_VERSION; //static removal 
      this.platformsObj.app_version = APP_VERSION;
      this.platformsObj.app_platform = this.platformType;
      //Check API for updated version 
      this.apiService.checkForAppUpdate(this.platformsObj).then((res: any) => {
     if (res.code == 200) {
        if (res.data[0]['app_version'] != this.platformsObj.app_version && res.data[0]['app_version'] > this.platformsObj.app_version) {
          this.UpdateApp();
        } else {
          console.log("After Login Social Model will call ")
          const authToken = window.localStorage.getItem('L2TraveleSIM_auth_token');
          if (!authToken) {
            //  this.navController.navigateRoot('start');
            // return;
          } else {
            this.isProfileIncomplete()
          }
        }
      }
    }, (err) => {
      //console.log('err ' + err);
    });
    //End 
    //}
  }

  async UpdateApp() {
    const modal = await this.modalController.create({
      component: UpdateAppPage,
      backdropDismiss: false, // Prevent dismissal by clicking outside the modal
    });
  
    return await modal.present();
  }
  // Get currency and launage country wise 

  getIPAddress() {
    this.http.get('https://ipinfo.io?token=83012227ee283b').subscribe((data: any) => {
      window.localStorage.setItem("L2TraveleSIM_IP", data.ip);
      window.localStorage.setItem('L2TraveleSIM_city', data.city);
      window.localStorage.setItem('L2TraveleSIM_country_code', data.country);
      console.log("Datas" + JSON.stringify(data));
      this.setCurrencyAndLanguage(data.country);
    }, error => {
      console.log("hiiiiiiiiiiiii");
      this.setDefaultCurrencyAndLanguage();
    });
  }

  setDefaultCurrencyAndLanguage() {
    if (window.localStorage.getItem("L2TraveleSIM_Saved_Currency") == "Yes" || window.localStorage.getItem("L2TraveleSIM_Saved_Currency") != null)
      this.currencyCode = window.localStorage.getItem("L2TraveleSIM_currency");
    else
      this.currencyCode = 'USD';
    window.localStorage.setItem('L2TraveleSIM_currency', this.currencyCode);
    window.localStorage.setItem('L2TraveleSIM_phone_code', "+44");
  }


  setCurrencyAndLanguage(countryCode: string) {
    const country = this.countryListWithCodes.find((c) => c.code == countryCode);
    if (country) {
        window.localStorage.setItem('L2TraveleSIM_phone_code', country.phone_code_country);
      if (window.localStorage.getItem("L2TraveleSIM_Saved_Currency") == "Yes" || window.localStorage.getItem("L2TraveleSIM_Saved_Currency") != null)
        this.currencyCode = window.localStorage.getItem("L2TraveleSIM_currency");
      else
        this.currencyCode = 'USD';
    } else {
      //If no country 
      if (window.localStorage.getItem("L2TraveleSIM_Saved_Currency") == "Yes" || window.localStorage.getItem("L2TraveleSIM_Saved_Currency") != null)
        this.currencyCode = window.localStorage.getItem("L2TraveleSIM_currency");
      else
        this.currencyCode = 'USD';
    }

    window.localStorage.setItem('L2TraveleSIM_currency', this.currencyCode);
  }

  //Step 4 Start

  initCountry() {
    this.countryParam.to_currency = this.currencyCode == '' || this.currencyCode == null ? 'USD' : this.currencyCode;
    const authToken = window.localStorage.getItem('L2TraveleSIM_auth_token');
    const isNotiSettingAllowed = window.localStorage.getItem('eSIM_IsNotiSettingAllow');

    if (!authToken) {
      //  this.navController.navigateRoot('start');
      // return;
    } else {
      this.getWalletBalance();
    }

    // Fetch and store country and zone bundles
    this.fetchCountryData();

    // Check notification settings and navigate
    if (!authToken && (!isNotiSettingAllowed || isNotiSettingAllowed === '')) {
      this.navController.navigateRoot('start');
    } else {
      this.navController.navigateRoot('home-search');
    }

    // Initialize push notifications if accepted
    if (isNotiSettingAllowed === 'yes') {
      this.initializePushNotifications();
    }
  }

  profileStatus: any = {};

  isProfileIncomplete(): void {
  const userDetails = JSON.parse(
    window.localStorage.getItem('L2TraveleSIM_userDetails') || '{}'
  );

  if (!userDetails?.id) {
    console.warn('No user details found in localStorage.');
    return;
  }

  this.profileStatus.user_id = userDetails.id;

  this.apiService.isProfileIncompleteService(this.profileStatus)
    .then((res: any) => {
      if (res?.code === 200) {
        if (res.data?.is_first_time === 0) {
          console.log('Popup will not appear');
        } else {
          this.modelSocialCountry(this.profileStatus.user_id);
          console.log('Popup will appear');
        }
      } else {
        console.error('API error: invalid response code', res);
      }
    })
    .catch((err) => {
      console.error('API error:', err);
    });
}

async modelSocialCountry(userId: string): Promise<void> {
  try {
    const modal = await this.modalController.create({
      component: SocailLoginCountryPhonePage, // ✅ component reference
      componentProps: { userId }, // 👈 pass userId if needed
    });

    modal.onDidDismiss().then((result) => {
      console.log('Modal result:', result);

      if (result?.data?.success === true) {
        this.successMSGModal(
          this.translate.instant('SIGNUP_SUCCESS_DESCRIPTION'),
          this.translate.instant('SIGNUP_SUCCESS_TITLE'),
          '2000'
        );
      }
    });

    await modal.present();
  } catch (err) {
    console.error('Error opening modal:', err);
  }
}



  // Success Modal
  async successMSGModal(buttonText: any, msg: any, times: any) {
    const modal = await this.modalController.create({
      component: SuccessModelPage,
      componentProps: { 'value': msg, 'value1': buttonText, 'value2': times }
    });

    modal.onDidDismiss();
    return await modal.present();
  }

  getWalletBalance() {
    this.apiService.updatedWalletBalance().then((res: any) => {
      if (res.code == 200) {
        if (res.data) {
          window.localStorage.setItem('L2TraveleSIM_user_wallets', res.data.user_wallet);
          window.localStorage.setItem('L2TraveleSIM_refer_balance', res.data.referal_wallet);
        }
      }
    }).catch(err => {
    })
  }

  // Function to fetch country data from the database
  async fetchCountryData() {
    this.apiService.getCountryListDB(this.countryParam).then((res: any) => {
      if (res.code == 200) {
        window.localStorage.setItem('L2TraveleSIM_countryBundles', JSON.stringify(res.data.countries));
        window.localStorage.setItem('L2TraveleSIM_ZoneBundles', JSON.stringify(res.data.zones));
        window.localStorage.setItem('L2TraveleSIM_destinations', JSON.stringify(res.data.destination));
      }
      else {
      }
    }).catch(err => {
    })
  }

  // Function to initialize push notifications and update player ID
  async initializePushNotifications() {
    if (this.platform.is('android') || this.platform.is('ios')) {
      setTimeout(async () => {
        try {
          const response = await this.getDeviceState();
          const storedPlayerId = window.localStorage.getItem('L2TraveleSIM_PLAYER_ID');

          if (!storedPlayerId && response.userId) {
            window.localStorage.setItem('L2TraveleSIM_PLAYER_ID', response.userId);
            await this.updatePlayerId(response.userId);
          }
        } catch (error) {
          console.error('Error getting device state:', error);
        }
      }, 500);
    }
  }

  // Helper function to get device state
  getDeviceState(): Promise<any> {
    return new Promise((resolve, reject) => {
      OneSignalPlugin.getDeviceState((response) => {
        if (response) {
          resolve(response);
        } else {
          reject('Failed to get device state');
        }
      });
    });
  }

  // Function to update the player ID in the database
  async updatePlayerId(pushToken: string) {
    const authToken = window.localStorage.getItem('L2TraveleSIM_auth_token');
    if (!authToken) return;

    try {
      const userDetails = JSON.parse(window.localStorage.getItem('L2TraveleSIM_userDetails') || '{}');
      this.pushDBToken.deviceToken = pushToken;
      this.pushDBToken.userid = userDetails.id;

      const response: any = await this.apiService.addPlayerId(this.pushDBToken, authToken);
      if (response.code === 200) {
        console.log('Added player ID successfully');
      } else {
        console.log('Unable to add player ID');
      }
    } catch (error) {
      console.error('Error updating player ID:', error);
    }
  }

  /* Step 5 End */

}

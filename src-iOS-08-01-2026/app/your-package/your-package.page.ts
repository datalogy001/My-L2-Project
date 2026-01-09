import { Component, OnInit, Input, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ServicesService } from '../api/services.service';
import * as moment from 'moment';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { TranslateService } from '@ngx-translate/core';
import { TopupNotAppliedModalPage } from '../topup-not-applied-modal/topup-not-applied-modal.page';

@Component({
    selector: 'app-your-package',
    templateUrl: './your-package.page.html',
    styleUrls: ['./your-package.page.scss'],
})
export class YourPackagePage implements OnInit {

    mergedAssignments: any = [];
    bundleDatas: any = [];
    statusOrder: any;
    constructor(private modalController: ModalController,private translate: TranslateService, private loadingScreen: LoadingScreenAppPage, private renderer: Renderer2, private el: ElementRef, private service: ServicesService, private navController: NavController, private Router: Router) { }
    tempBundles: any = [];
    networkImages: any = [];
    isBundleExpired: any = false;
    fromBundlesAPI: any = { 'initAmount': '', 'remainAmount': '' }
    bundlesExpiredDetails: any = { 'remainingQuantity': '' };
    usedPercentage: any;
    initDataAmount: any = '0 GB';
    remainDataamount: any = '0 GB';
    startTimefromBundle: any;
    endTimefromBundle: any;
    unitFactors: any = {};
    tempRemain: any;
    tempInit: any;
    countryBanner: any;
    startDate: any = '';
    daysDifferenceStartEnd: any = '';
    daysDifferenceCurrentEnd: any = '';
    endDate: any = '';
    isButton: any;
    topupArray: any = [];
    tmpcurrDate: any = '';
    tmpendDate: any = '';
    currDate: any = '';
    transformCaps(items: any) {
        return 'GB';
    }
    timeUnit: any;


    private max: number = -219.99078369140625;

    handleRefresh(event: any) {
        if (this.bundleDatas.profile_status != 'Topup') {
            this.getCurrentPackage(this.bundleDatas.iccid);
        } else { 
            this.getCurrentPackageTOPUP(this.bundleDatas.iccid);
        }
        event.target.complete();
    }

    totalGB: any;
    remainingGB: any;

    convertintoCountryLang(countryName: any) {
        // Convert countryName to uppercase
        const upperCaseCountryName = countryName.toUpperCase();
        // Use the uppercase countryName in the translation key
        return this.translate.instant(`COUNTRIES.${upperCaseCountryName}`);
    }

    convertintoZoneLang(zones: any) {
        return this.translate.instant(`ZONES.${zones}`)
    }
    bundleName: any;

    commonIntValues() {
        this.tempBundles = this.Router.getCurrentNavigation()?.extras.state;
        this.bundleDatas = this.tempBundles.bundleData;

        if (this.bundleDatas.type == 'country')
            this.bundleName = this.convertintoCountryLang(this.bundleDatas.short_name_country);
        else
            this.bundleName = this.convertintoZoneLang(this.bundleDatas.short_name_country);
        if (this.bundleDatas.short_name_country == 'North America' || this.bundleDatas.short_name_country == 'north america') {
            this.countryBanner = 'North_America.jpg';
        } else if (this.bundleDatas.short_name_country == 'Middle East' || this.bundleDatas.short_name_country == 'middle east') {
            this.countryBanner = 'Middle_East.jpg';
        } else if (this.bundleDatas.short_name_country == 'CY' || this.bundleDatas.short_name_country == 'cy') {
            this.countryBanner = 'CY.jpg';
        } else if (this.bundleDatas.short_name_country == 'ZM' || this.bundleDatas.short_name_country == 'zm') {
            this.countryBanner = 'ZM.jpg';
        } else if (this.bundleDatas.short_name_country == 'ASIA' || this.bundleDatas.short_name_country == 'asia') {
            this.countryBanner = 'Asia.jpg';
        }
        else if (this.bundleDatas.short_name_country == 'AFRICA' || this.bundleDatas.short_name_country == 'africa') {
            this.countryBanner = 'Africa.jpg';
        }
        else if (this.bundleDatas.short_name_country == 'global' || this.bundleDatas.short_name_country == 'Global') {
            this.countryBanner = 'Global.jpg';
        } 
        else if (this.bundleDatas.short_name_country == 'Europe' || this.bundleDatas.short_name_country == 'europe') {
            this.countryBanner = 'Europe.jpg';
        } 
        else if (this.bundleDatas.short_name_country == 'Europe+' || this.bundleDatas.short_name_country == 'europe+') {
            this.countryBanner = 'Europe.jpg';
        } else if (this.bundleDatas.short_name_country == 'Oceania' || this.bundleDatas.short_name_country == 'oceania') {
            this.countryBanner = 'Oceania.jpg';
        }
        else {
            this.countryBanner = this.bundleDatas.short_name_country.toUpperCase() + '.jpg';

        }
    }

  dataamountField:any;
    dataDaysField:any  ;
   
    IsDatabalanceLoaded:any=false;
    ngOnInit() {
        this.commonIntValues();
        this.IsDatabalanceLoaded =false;
        this.loadingData();
    }

   async loadingData()
   {
    await this.loadingScreen.presentLoading();
    if (this.bundleDatas.profile_status != 'Topup') {
          this.getCurrentPackage(this.bundleDatas.iccid);
      } else { 
          this.getCurrentPackageTOPUP(this.bundleDatas.iccid);
      }
   }

   //Normal Plan 
   getCurrentPackage(iccid: any) {
    this.service.getBundleUsedData(iccid).then((res: any) => {

      if(res.code == 200 )
      {
        if (res.data[0]['bundles'].length > 0) {
          console.log("Bundle length=>" + res.data[0].bundles.length);
          this.mergedAssignments = res.data[0].bundles.reduce((acc: any, obj: any) => acc.concat(obj.assignments), []);
          this.checkWithTopups(this.mergedAssignments);
        } else {
          this.IsDatabalanceLoaded =true;
          this.loadingScreen.dismissLoading();
          this.topupArray = this.bundleDatas.topups;
          if (this.bundleDatas.isUnlimited == false) {
            this.dataamountField = this.bundleDatas.dataamount + "GB";
            this.fromBundlesAPI.initAmount = this.removeDecimalFromString(this.bundleDatas.initial_quantity);
            this.totalGB = this.fromBundlesAPI.initAmount * 1000000000;
            // Step 1: Extract numerical value and remove non-numeric characters
            let numericValue;
            if (this.bundleDatas.remaining_quantity.includes("GB")) {
                numericValue = parseFloat(this.bundleDatas.remaining_quantity) * 1000 * 1000 * 1000; // Convert GB to bytes
            } else if (this.bundleDatas.remaining_quantity.includes("MB")) {
                numericValue = parseFloat(this.bundleDatas.remaining_quantity) * 1000 * 1000; // Convert MB to bytes
            } else {
                throw new Error("Unsupported unit. Only GB and MB are supported.");
            }

            // Step 2: Convert to integer (assuming you want the number as an integer)
            let integerValue = Math.round(numericValue); // Round to nearest integer
            setTimeout(() => {
                this.updateProgressValueData(this.totalGB, integerValue);    
            }, 100);
            

        } else { // Mega daily paas 
            this.dataDaysField = this.bundleDatas.days;
            if (this.bundleDatas.end_time == null || this.bundleDatas.end_time == '') {
                this.remainDataamount = '0 Day';
                this.initDataAmount = this.bundleDatas.days;
                this.remainingDays = this.extractDaysFromStringDays(this.remainDataamount);
                this.totalDays = this.extractDaysFromStringDays(this.initDataAmount);
                setTimeout(() => {
                this.updateProgressMegaDaily(this.totalDays, this.remainingDays, 'days')
            }, 100);

            } else {
                this.currDate = moment();
                this.startDate = moment(this.bundleDatas.start_time, moment.ISO_8601);
                this.endDate = moment(this.bundleDatas.end_time, moment.ISO_8601);

                // Calculate total days and hours
                const totalDays = this.endDate.diff(this.startDate, 'days');// Total days
                const totalHours = this.endDate.diff(this.startDate, 'hours'); // Total hours for percentage
                const remainingTimeInMinutes = this.endDate.diff(this.currDate, 'minutes'); // Remaining time in minutes

                if (remainingTimeInMinutes > 0) {
                    const remainingDays = Math.floor(remainingTimeInMinutes / (24 * 60)); // Complete days remaining
                    const remainingHours = Math.floor((remainingTimeInMinutes % (24 * 60)) / 60); // Hours left
                    const remainingMinutes = remainingTimeInMinutes % 60; // Minutes left

                    if (remainingDays > 0) {
                        // Display in days if more than 1 day left
                        this.remainDataamount = `${remainingDays} Days`;
                        setTimeout(() => {
                            this.updateProgressMegaDaily(totalDays, remainingDays, 'days');    
                        }, 100);
                        
                    } else if (remainingHours > 0 || remainingMinutes > 0) {
                        // Display hours and minutes if less than 24 hours
                        this.remainDataamount = `${remainingHours}:${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}`;
                        setTimeout(() => {
                        this.updateProgressMegaDaily(totalHours, remainingHours + (remainingMinutes > 0 ? 1 : 0), 'hours');
                    }, 100);
                    } else {
                        // Less than 1 hour, show only minutes
                        this.remainDataamount = `${remainingMinutes} Minutes`;
                        setTimeout(() => {
                        this.updateProgressMegaDaily(60, remainingMinutes, 'minutes');
                    }, 100);
                    }
                } else {
                    // If no time is remaining, mark status as expired
                    this.remainDataamount = 'Expired';
                }

            }

        }
        }
    }else{
        this.IsDatabalanceLoaded =true;
        this.loadingScreen.dismissLoading();
    }
    }).catch(err => {
        this.IsDatabalanceLoaded =true;
        this.loadingScreen.dismissLoading();
      
        if (this.bundleDatas.isUnlimited == false) {
            this.dataamountField = this.bundleDatas.dataamount + "GB";
            this.fromBundlesAPI.initAmount = this.removeDecimalFromString(this.bundleDatas.initial_quantity);
            this.totalGB = this.fromBundlesAPI.initAmount * 1000000000;
            // Step 1: Extract numerical value and remove non-numeric characters
            let numericValue;
            if (this.bundleDatas.remaining_quantity.includes("GB")) {
                numericValue = parseFloat(this.bundleDatas.remaining_quantity) * 1000 * 1000 * 1000; // Convert GB to bytes
            } else if (this.bundleDatas.remaining_quantity.includes("MB")) {
                numericValue = parseFloat(this.bundleDatas.remaining_quantity) * 1000 * 1000; // Convert MB to bytes
            } else {
                throw new Error("Unsupported unit. Only GB and MB are supported.");
            }

            // Step 2: Convert to integer (assuming you want the number as an integer)
            let integerValue = Math.round(numericValue); // Round to nearest integer
            setTimeout(() => {
                this.updateProgressValueData(this.totalGB, integerValue);    
            }, 100);
            

        } else { // Mega daily paas 
            this.dataDaysField = this.bundleDatas.days;
            if (this.bundleDatas.end_time == null || this.bundleDatas.end_time == '') {
                this.remainDataamount = '0 Day';
                this.initDataAmount = this.bundleDatas.days;
                this.remainingDays = this.extractDaysFromStringDays(this.remainDataamount);
                this.totalDays = this.extractDaysFromStringDays(this.initDataAmount);
                setTimeout(() => {
                this.updateProgressMegaDaily(this.totalDays, this.remainingDays, 'days');
            }, 100);

            } else {
                this.currDate = moment();
                this.startDate = moment(this.bundleDatas.start_time, moment.ISO_8601);
                this.endDate = moment(this.bundleDatas.end_time, moment.ISO_8601);

                // Calculate total days and hours
                const totalDays = this.endDate.diff(this.startDate, 'days');// Total days
                const totalHours = this.endDate.diff(this.startDate, 'hours'); // Total hours for percentage
                const remainingTimeInMinutes = this.endDate.diff(this.currDate, 'minutes'); // Remaining time in minutes

                if (remainingTimeInMinutes > 0) {
                    const remainingDays = Math.floor(remainingTimeInMinutes / (24 * 60)); // Complete days remaining
                    const remainingHours = Math.floor((remainingTimeInMinutes % (24 * 60)) / 60); // Hours left
                    const remainingMinutes = remainingTimeInMinutes % 60; // Minutes left

                    if (remainingDays > 0) {
                        // Display in days if more than 1 day left
                        this.remainDataamount = `${remainingDays} Days`;
                        setTimeout(() => {
                            this.updateProgressMegaDaily(totalDays, remainingDays, 'days');    
                        }, 100);
                        
                    } else if (remainingHours > 0 || remainingMinutes > 0) {
                        // Display hours and minutes if less than 24 hours
                        this.remainDataamount = `${remainingHours}:${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}`;
                        setTimeout(() => {
                        this.updateProgressMegaDaily(totalHours, remainingHours + (remainingMinutes > 0 ? 1 : 0), 'hours');
                    }, 100);
                    } else {
                        // Less than 1 hour, show only minutes
                        this.remainDataamount = `${remainingMinutes} Minutes`;
                        setTimeout(() => {
                        this.updateProgressMegaDaily(60, remainingMinutes, 'minutes');
                    }, 100);
                    }
                } else {
                    // If no time is remaining, mark status as expired
                    this.remainDataamount = 'Expired';
                }

            }

        }
    })
  }

 

    convertSizeToBytes(sizeString: any) {
        // Extract numeric part from the size string
        let numericPart = parseFloat(sizeString);

        // Determine the unit (MB, GB, etc.) based on the string
        let unit = sizeString.replace(/[^a-zA-Z]/g, '').toUpperCase();

        // Define conversion factors based on units
        this.unitFactors = {
            'B': 1,
            'KB': 1024,
            'MB': 1024 * 1024,
            'GB': 1024 * 1024 * 1024,
            'TB': 1024 * 1024 * 1024 * 1024,
        };

        // Convert the numeric part to bytes
        let bytes = numericPart * this.unitFactors[unit];

        return bytes;
    }
    removeDecimalFromString(inputString: any) {
        // Parse the input string to a float and convert it back to a string
        let stringWithoutDecimal = parseFloat(inputString).toString();

        // If the string ends with '.00', remove it
        if (stringWithoutDecimal.endsWith('.00')) {
            stringWithoutDecimal = stringWithoutDecimal.slice(0, -3);
        }

        return stringWithoutDecimal;
    }



    // Example function to extract number of days from a string
    extractDaysFromStringDays(inputString: string): number | undefined {
        // Use a regular expression to extract the first numeric part from the string
        const match = inputString.match(/\d+/);

        if (match) {
            const numberValue = parseInt(match[0], 10);

            // Check if the conversion was successful
            if (!isNaN(numberValue)) {
                return numberValue; // Return the number
            }
        }

        return undefined; // Return undefined if no number is found or conversion fails
    }

    // Example function to extract number of days from a string
    extractDaysFromStringDay(inputString: string): number | undefined {
        // Use a regular expression to extract the first numeric part from the string
        const match = inputString.match(/\d+/);

        if (match) {
            const numberValue = parseInt(match[0], 10);

            // Check if the conversion was successful
            if (!isNaN(numberValue)) {
                return numberValue; // Return the number
            }
        }

        return undefined; // Return undefined if no number is found or conversion fails
    }

    updateProgressMegaDaily(totalTime: any, remainingTime: any, timeUnit: 'days' | 'hours' | 'minutes') {
        const progressBars = this.el.nativeElement.querySelectorAll('.progress');

        // Avoid division by zero and calculate the progress percentage
        const progressPercentage = totalTime === 0 ? 0 : (remainingTime / totalTime) * 100;

        console.log(progressPercentage);

        progressBars.forEach((progress: any) => {
            const fill = progress.querySelector('.fill');
            const value = progress.querySelector('.value');
            const daysLeft = progress.querySelector('.days-left');

            const strokeDashoffset = ((100 + progressPercentage) / 100) * 219.99078369140625;

            // Log progress for debugging
            console.log(`Total Time: ${totalTime}, Remaining Time: ${remainingTime}, Progress Percentage: ${progressPercentage}, Stroke Dashoffset: ${strokeDashoffset}`);

            // Update stroke-dashoffset for the visual progress
            this.renderer.setStyle(fill, 'transition', 'none');
            this.renderer.setStyle(fill, 'stroke-dashoffset', strokeDashoffset);

            // Display progress value and remaining time
            value.innerHTML = `${remainingTime}`;
            daysLeft.innerHTML = this.translate.instant(
                timeUnit === 'days' ? (remainingTime > 1 ? 'DAYS_LEFT' : 'DAY_LEFT')
                    : timeUnit === 'hours' ? (remainingTime > 1 ? 'HOURS_LEFT' : 'HOUR_LEFT')
                        : (remainingTime > 1 ? 'DAY_LEFT' : 'DAY_LEFT')
            );
        });
    }
    remainingDays: any = 0;
    totalDays: any = 0;

    updateProgressValueData(totalDays: number, remainingDays: number) {
        const progressBars = this.el.nativeElement.querySelectorAll('.progress');
        const percent = (remainingDays / totalDays) * 100;

        progressBars.forEach((progress: any) => {
            const fill = progress.querySelector('.fill');
            const value = progress.querySelector('.value');
            const daysLeft = progress.querySelector('.days-left');

            const strokeDashoffset = ((100 + percent) / 100) * 219.99078369140625;

            //this.renderer.setStyle(fill, 'stroke-dashoffset', strokeDashoffset);
            this.renderer.setStyle(fill, 'transition', 'none');
            this.renderer.setStyle(fill, 'stroke-dashoffset', strokeDashoffset);

            // Convert remainingDays to a human-readable format
            const humanReadableValue = this.transform(remainingDays);

            console.log(humanReadableValue);

            // Separate the value and unit (assuming humanReadableValue is a string with value and unit)
            let [valuePart, unitPart] = humanReadableValue.split(' ');

            // Set the numeric value separately
            value.innerHTML = valuePart;

            // Set the unit and "LEFT" text
            daysLeft.innerHTML = `${unitPart} ${this.translate.instant('LEFT')}`;
        });
    }

    values: any;

    transform(bytes: number): string {
        if (bytes == 0) return '0 GB';

        const sizes = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log10(bytes) / 3);

        return parseFloat((bytes / Math.pow(1000, i)).toFixed(2)) + ' ' + sizes[i];
    }

    getCurrentPackageTOPUP(iccid: any) {
       this.service.getBundleUsedData(iccid).then((res: any) => {
          
            if(res.code == 200 )
                {
            if (res.bundles.length > 0) {
                // Merge assignments and add the name to each assignment
                this.mergedAssignments = res.bundles.reduce((acc: any, bundle: any) => {
                    const assignmentsWithName = bundle.assignments.map((assignment: any) => {
                        // Add the name from the bundle to each assignment
                        assignment.name = bundle.name;
                        return assignment;
                    });
                    return acc.concat(assignmentsWithName);
                }, []);
                
                this.checkBundleState(this.mergedAssignments);
            } else {
                this.topupArray = this.bundleDatas.topups;
                if (this.bundleDatas.isUnlimited == false) {
                    const totalGB = 0;
                    const remainingGB = 0;
                    this.dataamountField = this.bundleDatas.dataamount + "GB"; 
                    setTimeout(() => {
                        this.updateProgressValueData(totalGB, remainingGB);    
                    }, 100);
                    
                } else { // Mega daily paas 
                    this.dataDaysField = this.bundleDatas.days;
                    const totalDays = 0;
                    const remainingDays = 0;
                    setTimeout(() => {
                    this.updateProgressMegaDaily(totalDays, remainingDays, 'days');
                }, 100);
                }
                
            }
        }else
        {
       this.loadingScreen.dismissLoading();
        this.IsDatabalanceLoaded =true;
        
        }
        }).catch(err => {
            // Handle error here
            this.IsDatabalanceLoaded =true;
            this.loadingScreen.dismissLoading();
            if (this.bundleDatas.isUnlimited == false) {
                const totalGB = 0;
                const remainingGB = 0;
                this.dataamountField = this.bundleDatas.dataamount + "GB"; 
                setTimeout(() => {
                    this.updateProgressValueData(totalGB, remainingGB);    
                }, 100);
                
            } else { // Mega daily paas 
                this.dataDaysField = this.bundleDatas.days;
                const totalDays = 0;
                const remainingDays = 0;
                setTimeout(() => {
                    this.updateProgressMegaDaily(totalDays, remainingDays, 'days');    
                }, 100);
                
            }
            
        });
    }

    
    expiredates:any; 
    isDepleted:any= false;
   
    checkBundleState(assignmenrtArr: any) {
        this.loadingScreen.dismissLoading();
        this.IsDatabalanceLoaded =true;
        this.topupArray = this.bundleDatas.topups;
        for (let i = 0; i < this.topupArray.length; i++) {
            for (let j = 0; j < assignmenrtArr.length; j++) {
                if (this.topupArray[i]['assignmentReference'] + '-0' == assignmenrtArr[j]['assignmentReference']) {
                    if (assignmenrtArr[j]['bundleState'] == 'depleted') {
                        this.bundleDatas.isUnlimited = assignmenrtArr[j]['unlimited'];
                        if(this.bundleDatas.isUnlimited == true)
                            this.dataDaysField = this.topupArray[i]['days'];
                        else
                            this.dataamountField = this.topupArray[i]['dataAmount'];
                        this.bundleDatas.short_name_country = this.topupArray[i]['shortname'];
                        this.bundleDatas.country = this.topupArray[i]['country'];
                        this.countryBanner = this.bundleDatas.short_name_country + '.jpg';

                        this.isDepleted = true;
                        let thirdPart = assignmenrtArr[j]['name'].split('_')[2]; // This gives "7D"
                        let numberOfDays = parseInt(thirdPart.match(/\d+/)[0]);  // Extracts the number (7)
                        // Convert the start time to a moment object
                        let startDate = moment(assignmenrtArr[j]['startTime'], moment.ISO_8601);
                        // Add the number of days to the start date
                        let expirationDate = startDate.add(numberOfDays, 'days');
                        // Format the new date in "dd/mm/yyyy"
                        this.expiredates = expirationDate.format('DD/MM/YYYY');
                    } 
                }
            }
        }
    }
    checkWithTopups(assignmenrtArr: any) {
        this.topupArray = this.bundleDatas.topups;
        this.loadingScreen.dismissLoading();
        this.IsDatabalanceLoaded =true;
        for (let i = 0; i < this.topupArray.length; i++) {
            let foundMatch = false; // Flag to check if a match is found

            for (let j = 0; j < assignmenrtArr.length; j++) {
                if (this.topupArray[i]['assignmentReference'] + '-0' == assignmenrtArr[j]['assignmentReference']) {
                    foundMatch = true;
                    // No use data amount and start and end time
                    if (assignmenrtArr[j]['bundleState'] == 'queued') {
                        this.topupArray[i]['status'] = 'Queued';

                    }
                    else if (assignmenrtArr[j]['bundleState'] == 'depleted') {
                        this.bundleDatas.isUnlimited = assignmenrtArr[j]['unlimited'];
                        if(this.bundleDatas.isUnlimited == true)
                            this.dataDaysField = this.topupArray[i]['days'];
                        else
                            this.dataamountField = this.topupArray[i]['dataAmount'];
                        this.bundleDatas.short_name_country = this.topupArray[i]['shortname'];
                        this.bundleDatas.country = this.topupArray[i]['country'];
                        this.countryBanner = this.bundleDatas.short_name_country + '.jpg';
                        this.topupArray[i]['status'] = 'Depleted';
                        //Value Data plan 
                        if (assignmenrtArr[j]['unlimited'] == false) {
                            
                            setTimeout(() => {
                                this.updateProgressValueData(assignmenrtArr[j]['initialQuantity'], assignmenrtArr[j]['remainingQuantity'])    
                            }, 100);
                            
                        } else { // Mega Daily Plan  

                            this.currDate = moment();
                            this.startDate = moment(assignmenrtArr[j]['startTime'], moment.ISO_8601);
                            this.endDate = moment(assignmenrtArr[j]['endTime'], moment.ISO_8601);

                            // Calculate total days and hours
                            const totalDays = this.endDate.diff(this.startDate, 'days');// Total days
                            const totalHours = this.endDate.diff(this.startDate, 'hours'); // Total hours for percentage
                            const remainingTimeInMinutes = this.endDate.diff(this.currDate, 'minutes'); // Remaining time in minutes

                            if (remainingTimeInMinutes > 0) {
                                const remainingDays = Math.floor(remainingTimeInMinutes / (24 * 60)); // Complete days remaining
                                const remainingHours = Math.floor((remainingTimeInMinutes % (24 * 60)) / 60); // Hours left
                                const remainingMinutes = remainingTimeInMinutes % 60; // Minutes left

                                if (remainingDays > 0) {
                                    // Display in days if more than 1 day left
                                    this.remainDataamount = `${remainingDays} Days`;
                                    setTimeout(() => {
                                    this.updateProgressMegaDaily(totalDays, remainingDays, 'days');
                                }, 100);
                                } else if (remainingHours > 0 || remainingMinutes > 0) {
                                    // Display hours and minutes if less than 24 hours
                                    this.remainDataamount = `${remainingHours}:${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}`;
                                    setTimeout(() => {
                                    this.updateProgressMegaDaily(totalHours, remainingHours + (remainingMinutes > 0 ? 1 : 0), 'hours');
                                }, 100);
                                } else {
                                    // Less than 1 hour, show only minutes
                                    this.remainDataamount = `${remainingMinutes} Minutes`;
                                    setTimeout(() => {
                                    this.updateProgressMegaDaily(60, remainingMinutes, 'minutes');
                                }, 100);
                                }
                            } else {
                                // If no time is remaining, mark status as expired
                                this.remainDataamount = 'Expired';
                            }
                        }

                    } else if (assignmenrtArr[j]['bundleState'] == 'active' || assignmenrtArr[j]['bundleState'] == 'Active') {
                        this.topupArray[i]['status'] = 'Active';
                        //For Active Bundle status 

                        
                        this.bundleDatas.isUnlimited = assignmenrtArr[j]['unlimited'];

                        if(this.bundleDatas.isUnlimited == true)
                            this.dataDaysField = this.topupArray[i]['days'];
                        else
                            this.dataamountField = this.topupArray[i]['dataAmount'];

                        this.bundleDatas.short_name_country = this.topupArray[i]['shortname'];
                        this.bundleDatas.country = this.topupArray[i]['country'];
                        this.countryBanner = this.bundleDatas.short_name_country + '.jpg';

                        //Value Data plan 
                        if (assignmenrtArr[j]['unlimited'] == false) {
                            setTimeout(() => {
                                this.updateProgressValueData(assignmenrtArr[j]['initialQuantity'], assignmenrtArr[j]['remainingQuantity'])
                            }, 100); 
                        } else { // Mega Daily Plan  

                            this.currDate = moment();
                            this.startDate = moment(assignmenrtArr[j]['startTime'], moment.ISO_8601);
                            this.endDate = moment(assignmenrtArr[j]['endTime'], moment.ISO_8601);

                            // Calculate total days and hours
                            const totalDays = this.endDate.diff(this.startDate, 'days');// Total days
                            const totalHours = this.endDate.diff(this.startDate, 'hours'); // Total hours for percentage
                            const remainingTimeInMinutes = this.endDate.diff(this.currDate, 'minutes'); // Remaining time in minutes

                            if (remainingTimeInMinutes > 0) {
                                const remainingDays = Math.floor(remainingTimeInMinutes / (24 * 60)); // Complete days remaining
                                const remainingHours = Math.floor((remainingTimeInMinutes % (24 * 60)) / 60); // Hours left
                                const remainingMinutes = remainingTimeInMinutes % 60; // Minutes left

                                if (remainingDays > 0) {
                                    // Display in days if more than 1 day left
                                    this.remainDataamount = `${remainingDays} Days`;
                                    setTimeout(() => {
                                    this.updateProgressMegaDaily(totalDays, remainingDays, 'days');
                                    },100); 
                                } else if (remainingHours > 0 || remainingMinutes > 0) {
                                    // Display hours and minutes if less than 24 hours
                                    this.remainDataamount = `${remainingHours}:${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}`;
                                    setTimeout(() => {
                                    this.updateProgressMegaDaily(totalHours, remainingHours + (remainingMinutes > 0 ? 1 : 0), 'hours');
                                },100); 
                                } else {
                                    // Less than 1 hour, show only minutes
                                    this.remainDataamount = `${remainingMinutes} Minutes`;
                                    setTimeout(() => {
                                    this.updateProgressMegaDaily(60, remainingMinutes, 'minutes');
                                },100); 
                                }
                            } else {
                                // If no time is remaining, mark status as expired
                                this.remainDataamount = 'Expired';
                            }
                        }
                        //END 
                    } else {
                        this.topupArray[i]['status'] = 'Expired';
                    }
                }
            }

            // If no match is found, update the status to 'Expired'
            if (!foundMatch) {
                this.topupArray[i]['status'] = 'Expired';
            }
        }

        this.queuedArray = this.topupArray.filter((item: any) => item.status == 'Queued');
        //console.log("before" + JSON.stringify(this.topupArray) );
        this.topupArray.sort((a: any, b: any) => {
            this.statusOrder = { 'Active': 1, 'Queued': 2, 'Depleted': 3, 'Expired': 4 };
            return this.statusOrder[a.status] - this.statusOrder[b.status];
        });

    }

    queuedArray: any = [];




	gotoMarketPlace()
		  {
		    this.navController.navigateRoot('marketplace');
		  }

    gotoBack() {
        this.bundleDatas=[];
        this.navController.pop();
    }
    gotoTab1() {
        this.navController.navigateRoot('/tab1');
    }

    //Common Footers
    gotoTab2() {
        this.navController.navigateRoot('/tab2');
    }

    gotoTab4() {
        this.navController.navigateRoot('/tab4');
    }

    gotoTab5() {
        this.navController.navigateRoot('/profile');
    }
    //End of common footers
 gotoToup() {
        //Checking for Platinum and Diamond bundles 
        if (this.bundleDatas.is_bundle_topup_available == 1) {
            let navigationExtras: NavigationExtras = {
                state: {
                    name: this.bundleDatas.country.trim(),
                    iso: (this.bundleDatas.type == 'region') ? this.bundleDatas.short_name_country : this.bundleDatas.short_name_country.toUpperCase(),
                    type: this.bundleDatas.type,
                    iccid: this.bundleDatas.iccid,
                    opt: ''
                }
            };
            this.Router.navigate(['/bundle-data-topup'], navigationExtras);
        } else {
            //Call alert to puchase bundle No -topup 
            this.topupNotAllowed();
        }
        //End     
    }


    // Error Modal
    async topupNotAllowed () {

        const modal = await this.modalController.create({
            component: TopupNotAppliedModalPage,
        });

        modal.onDidDismiss().then((result: any) => {
            if (result.data == 1) {
                let navigationExtras: NavigationExtras = {
                    state: {
                        name: this.bundleDatas.country.trim(),
                        iso: (this.bundleDatas.type == 'region') ? this.bundleDatas.short_name_country : this.bundleDatas.short_name_country.toUpperCase(),
                        type: this.bundleDatas.type,
                        iccid: '',
                        isDestinations: false,
                        opt: ''
                    }
                };
                this.Router.navigate(['/bundle'], navigationExtras);
            }
        });
        return await modal.present();

        
    }

    getBackgroundUrl() {
        return `url('assets/countryBanners/${this.countryBanner}') no-repeat center top / cover`;
    }
}


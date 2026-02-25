// popover-content.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-popover-content-logo',
  templateUrl: './popover-content-logo.page.html',
  styleUrls: ['./popover-content-logo.page.scss'],
})
export class PopoverContentLogoPage implements OnInit {

  @Input("items") items: any;

  constructor(private popoverController: PopoverController) {}

  ngOnInit(): void {
    
  }
}
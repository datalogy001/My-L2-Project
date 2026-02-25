// popover-content.component.ts
import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-content',
  templateUrl: 'popover-content.component.html',
})
export class PopoverContentComponent {
  @Input("items") items: any;

  constructor(private popoverController: PopoverController) {}

}
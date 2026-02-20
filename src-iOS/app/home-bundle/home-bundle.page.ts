import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-bundle',
  templateUrl: './home-bundle.page.html',
  styleUrls: ['./home-bundle.page.scss'],
})
export class HomeBundlePage implements OnInit {

  constructor() { }

  selectedSegment: string = 'active';

  ngOnInit() {
  }

}

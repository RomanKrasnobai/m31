import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.sass']
})
export class HeaderComponent implements OnInit {

  get location(): Location {
    return document.location;
  }

  constructor() {}

  ngOnInit() {
  }

}

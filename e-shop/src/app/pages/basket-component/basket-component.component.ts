import {Component, OnInit} from '@angular/core';
import { MatDialogRef} from "@angular/material";
import {HomeComponent} from "../home-component/home-component.component";

@Component({
  selector: 'app-basket-component',
  templateUrl: './basket-component.component.html',
  styleUrls: ['./basket-component.component.sass']
})
export class BasketComponentComponent implements OnInit {

  order: any;
  constructor(public dialogRef: MatDialogRef<HomeComponent>,
  ) { }

  ngOnInit() {
    this.order = JSON.parse(localStorage.getItem('productsOrder'));
  }

  close() {
    this.dialogRef.close();
  }

}

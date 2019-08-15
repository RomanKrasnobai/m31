import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {HomeComponent} from "../home-component/home-component.component";
import {OrderBasket} from "../../models/OrderBasket";

@Component({
  selector: 'app-basket-component',
  templateUrl: './basket-component.component.html',
  styleUrls: ['./basket-component.component.sass']
})
export class BasketComponentComponent implements OnInit {

  order: Array<OrderBasket>;

  constructor(public dialogRef: MatDialogRef<HomeComponent>,) { }

  ngOnInit() {
    this.order = JSON.parse(localStorage.getItem('productsOrder'));
    console.log(this.order);
  }

  removeProductFromBasket(product) {
    const index = this.order.indexOf(product);
    if (index != -1) {
      this.order.splice(index, 1);
    }
    localStorage.setItem('productsOrder', JSON.stringify(this.order));
  }

  getSummaryBasket() {
    let sum = 0;
    this.order.forEach(item => {
      sum += item.price;
    });
    return sum;
  }

  close() {
    this.dialogRef.close();
  }

}

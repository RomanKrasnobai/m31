import { Component, OnInit } from '@angular/core';
import {OrderBasket} from "../../models/OrderBasket";

@Component({
  selector: 'app-summary-component',
  templateUrl: './summary-component.component.html',
  styleUrls: ['./summary-component.component.sass']
})
export class SummaryComponent implements OnInit {

  order: Array<OrderBasket>;

  constructor() { }

  ngOnInit() {
    this.order = JSON.parse(localStorage.getItem('productsOrder'));
    console.log('sum',this.order);
  }

  getSummaryBasket() {
    let sum = 0;
    this.order.forEach(item => {
      sum += item.price;
    });
    return sum;
  }

}

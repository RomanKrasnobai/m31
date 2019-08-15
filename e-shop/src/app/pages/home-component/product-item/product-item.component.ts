import {Component, Input, OnInit} from '@angular/core';
import {OrderBasket} from "../../../models/OrderBasket";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.sass']
})
export class ProductItemComponent implements OnInit {

  @Input() product;
  orders: Array<OrderBasket> = [];

  constructor() { }

  ngOnInit() {

  }

  toBasket(product) {
    if (product && localStorage.getItem('productsOrder') !== 'undefined') {
      this.orders = JSON.parse(localStorage.getItem('productsOrder')) ;
      this.orders.push(product);
      localStorage.setItem('productsOrder', JSON.stringify(this.orders));
    }

  }
}

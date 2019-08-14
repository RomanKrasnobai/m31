import {Component, Input, OnInit} from '@angular/core';
import {OrdersService} from "../../../services/orders.service";
import {Item} from "../../../models/item";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.sass']
})
export class ProductItemComponent implements OnInit {

  @Input() product;
  orders: Array<Item>  = [];
  constructor() { }

  ngOnInit() {

  }

  toBasket(product) {
    this.orders.push(product);
    console.log(this.orders);

    localStorage.setItem('productsOrder', JSON.stringify(this.orders));
  }
}

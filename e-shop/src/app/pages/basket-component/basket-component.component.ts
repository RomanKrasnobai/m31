import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {HomeComponent} from "../home-component/home-component.component";
import {OrderBasket} from "../../models/OrderBasket";
import {Router} from "@angular/router";

@Component({
  selector: 'app-basket-component',
  templateUrl: './basket-component.component.html',
  styleUrls: ['./basket-component.component.sass']
})
export class BasketComponentComponent implements OnInit {

  order: Array<OrderBasket>;

  constructor(private dialogRef: MatDialogRef<HomeComponent>,
              private router: Router) { }

  ngOnInit() {
    this.order = JSON.parse(localStorage.getItem('productsOrder'));
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

  goToSummary() {
    this.router.navigate(['/summary']);
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

}

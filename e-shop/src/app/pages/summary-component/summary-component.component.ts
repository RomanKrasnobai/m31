import { Component, OnInit } from '@angular/core';
import {OrderBasket} from "../../models/OrderBasket";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-summary-component',
  templateUrl: './summary-component.component.html',
  styleUrls: ['./summary-component.component.sass']
})
export class SummaryComponent implements OnInit {

  order: Array<OrderBasket>;
  orderForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.order = JSON.parse(localStorage.getItem('productsOrder'));
    this.formValidation();

    console.log('sum',this.order);
  }

  formValidation() {
    this.orderForm = this.fb.group({
      city: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      npPost: [false],
      npCourier: [false],
      ukrPost: [false],
    })
  }

  getSummaryBasket() {
    let sum = 0;
    this.order.forEach(item => {
      sum += item.price;
    });
    return sum;
  }

}

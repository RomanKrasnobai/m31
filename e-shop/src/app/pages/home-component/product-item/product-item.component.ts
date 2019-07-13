import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.sass']
})
export class ProductItemComponent implements OnInit {

  @Input() id: string;
  @Input() category: any;
  @Input() description: any;
  @Input() image: any;
  @Input() name: any;
  @Input() price: number;
  constructor() { }

  ngOnInit() {
  }

}

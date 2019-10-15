import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {ItemsService} from '../../services/items.service';

@Component({
  selector: 'app-product-info-component',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.sass']
})
export class ProductInfoComponent implements OnInit {

  product: any;
  selectedId: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private itemsService: ItemsService) { }

  ngOnInit() {

  }
}

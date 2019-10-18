import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {ItemsService} from '../../services/items.service';
import {Item} from '../../models/item';

@Component({
  selector: 'app-product-info-component',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.sass']
})
export class ProductInfoComponent implements OnInit {

  product: Item;
  constructor(
    private activatedRoute: ActivatedRoute,
    private itemsService: ItemsService) { }

  ngOnInit() {
    this.itemsService.getById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      item => {
          this.product = item;
          console.log(this.product);
        }
    );
  }
}

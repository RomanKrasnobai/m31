import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Item } from 'src/app/models/item';
import {MatDialog} from "@angular/material";
import {BasketComponentComponent} from "../basket-component/basket-component.component";

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.sass']
})
export class HomeComponent implements OnInit {

  data: Array<Item>;

  constructor(private itemsService: ItemsService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.itemsService.getAll()
      .subscribe(
        items => {
          this.data = items;
        }
      );
  }

  openDialog() {
    const dialogRef = this.dialog.open(BasketComponentComponent, {
      width: '250px',
    });
  }
}

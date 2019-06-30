import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.sass']
})
export class HomeComponent implements OnInit {

  data: Array<Item>;

  constructor(private itemsService: ItemsService
  ) { }

  ngOnInit() {
    this.itemsService.getAll()
      .subscribe(
        items => this.data = items
      );
  }
}

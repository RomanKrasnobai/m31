import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/category';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.sass']
})
export class LeftMenuComponent implements OnInit {
  categories: Array<Category>;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(
      item => {
        this.categories = item;
        // console.log(this.categories);
      });
  }

}

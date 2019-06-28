import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import {AsyncDataService} from '../../services/async-data.service/async-data.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.sass']
})
export class HomeComponent implements OnInit {

  data: any;

  constructor(private http: HttpClient,
              // private asyncDataService: AsyncDataService
  ) { }

  ngOnInit() {
    // this.asyncDataService.getAllItems().subscribe(item => { this.data = item; });
  }
}

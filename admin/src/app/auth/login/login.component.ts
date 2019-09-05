import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/app.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  userDisplayName: string;
  creationTime: string;
  token: string;
  userUid: string;

  loggedId = false;

  constructor(private http: HttpClient, private appService: AppService) { }

  ngOnInit() {
  }

  login() {
    this.appService.loading$.next(true);
    this.http.post<string>('api/auth/login', { email: this.email, password: this.password})
    .pipe(finalize(() => this.appService.loading$.next(false)))
    .subscribe(
      token => this.token = token
    );
  }

}

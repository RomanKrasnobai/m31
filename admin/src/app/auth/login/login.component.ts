import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

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

  constructor() { }

  ngOnInit() {
  }

  login() {
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    .then(res => {
      const user = res.user;
      this.userDisplayName = user.displayName;
      this.creationTime = user.metadata.creationTime;
      this.userUid = user.uid;
      user.getIdToken().then(token => {
        this.token = token;
        localStorage.setItem('auth_token', token);
      });
      localStorage.setItem('firebase_user', JSON.stringify(user));
      this.loggedId = true;
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
      console.error({ errorCode, errorMessage});
    });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider).then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = result.credential;
      // The signed-in user info.
      const user = result.user;
      // ...
      console.log({ credential, user });
    }).catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
      console.error({ errorCode, errorMessage, email, credential });
    });
  }

}

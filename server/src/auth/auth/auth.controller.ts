import { Controller, Post } from '@nestjs/common';
import firebase = require('firebase');

@Controller('auth')
export class AuthController {
  @Post('login')
  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider).then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = result.credential;
      // The signed-in user info.
      const user = result.user;
      // ...
      Promise.resolve({ credential, user});
    }).catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
      Promise.resolve({ errorCode, errorMessage, email, credential });
    });
  }
}

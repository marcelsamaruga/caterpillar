import { Component, OnInit, NgZone, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "./auth.service";
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"]
})
export class AuthPage implements OnInit, OnDestroy {
  ui: firebaseui.auth.AuthUI;

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    const authConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ],

      callbacks: {
        signInSuccessWithAuthResult: this.onLoginSucceed.bind(this)
      }
    };

    this.ui = new firebaseui.auth.AuthUI( this.afAuth.auth );
    this.ui.start('#firebaseui-auth-div', authConfig);
  }

  ngOnDestroy() {
    this.ui.delete();
  }

  onLoginSucceed(result) {
    this.ngZone.run(
      () => this.router.navigateByUrl('/student')
    );

  }

}

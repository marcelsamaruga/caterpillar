import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, from } from "rxjs";
import { map, tap, take } from "rxjs/operators";

import { User } from "./user.model";
import { Plugins } from "@capacitor/core";
import * as firebase from "firebase/app";

export interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class AuthService implements OnDestroy {
  private user = new BehaviorSubject<User>(null);

  constructor(private afAuth: AngularFireAuth) {}

  userIsAuthenticated() {
    if (this.autoLogin()) {
      return true;
    }

    this.user
      .asObservable()
      .pipe(
        take(1),
        map(user => {
          if (user) {
            console.log("user " + user);
            return !!user.getToken();
          } else {
            return false;
          }
        })
      );

    return this.user;
  }

  getUserId() {
    this.user
      .asObservable()
      .pipe(
        take(1),
        map(user => {
          if (user) {
            return user.id;
          } else {
            return null;
          }
        })
      );

    return this.user;
  }

  logout() {
    Plugins.Storage.remove({ key: "authData" });
    this.afAuth.auth.signOut();
  }

  autoLogin() {
    let isValid = false;
    from(Plugins.Storage.get({ key: "authData" }))
      .pipe(
        map(authData => {
          console.log(authData);
          if (!authData || !authData.value) {
            return null;
          }

          const parseData = JSON.parse(authData.value) as {
            userId: string;
            token: string;
            tokenExpiration: Date;
            email: string;
          };

          if (parseData.tokenExpiration <= new Date()) {
            return null;
          }

          const user = new User(
            parseData.userId,
            parseData.email,
            parseData.token,
            parseData.tokenExpiration
          );
          return user;
        }),
        tap(user => {
          if (user) {
            this._user.next(user);
          }
        }),
        map(user => {
          return !!user;
        })
      )
      .subscribe(isValidUser => {
        console.log("isValid " + isValid);
        isValid = isValidUser;
      });

    console.log("final " + isValid);
    return isValid;
  }

  ngOnDestroy() {
    this.user.unsubscribe();
  }


}

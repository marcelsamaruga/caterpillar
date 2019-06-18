import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, from } from "rxjs";
import { map, tap, take } from "rxjs/operators";

import { environment } from "../../environments/environment";
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
export class AuthService {
  private _user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  userIsAuthenticated() {
    let userValid = false;

    if (this.autoLogin()) {
      return true;
    }

    this._user
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
      )
      .subscribe(userIsValid => (userValid = userIsValid));
    console.log("userValid " + userValid);

    return userValid;
    //return true;
  }

  getUserId() {
    let userId = null;
    this._user
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
      )
      .subscribe(userIdReturned => (userId = userIdReturned));

    return userId;
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${
          environment.firebaseAPIKey
        }`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(tap(this.setUserData.bind(this)));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${
          environment.firebaseAPIKey
        }`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(tap(this.setUserData.bind(this)));
  }

  logout() {
    Plugins.Storage.remove({ key: "authData" });
    this._user.next(null);
  }

  private setUserData(userData: AuthResponse) {
    let expirationTime = new Date().getTime();

    if (userData && userData.expiresIn) {
      expirationTime =
        new Date().getTime() + +userData.expiresIn * (5 * 24 * 60 * 60);
    }

    this._user.next(
      new User(
        userData.localId,
        userData.email,
        userData.idToken,
        new Date(expirationTime)
      )
    );
    this.storedIdentification(
      userData.localId,
      userData.idToken,
      new Date(expirationTime),
      userData.email
    );
  }

  storedIdentification(
    userId: string,
    token: string,
    tokenExpiration: Date,
    email: string
  ) {
    const data = {
      userId: userId,
      token: token,
      tokenExpiration: tokenExpiration,
      email: email
    };
    Plugins.Storage.set({
      key: "authData",
      value: JSON.stringify(data)
    }).then();
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
    this._user.unsubscribe();
  }

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      /*this.afAuth.auth.signInWithPopup(provider).then(
        res => {
          resolve(res);
        },
        err => {
          console.log(err);
          reject(err);
        }
      );*/
    });
  }

  createNewUser(userId, email, idToken, expirationTime) {
    this._user.next(
      new User(
        userId,
        email,
        idToken,
        new Date(expirationTime)
      )
    );
  }
}

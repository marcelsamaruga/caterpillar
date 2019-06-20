import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import {
  LoadingController,
  AlertController,
  ToastController
} from "@ionic/angular";
import { Observable } from "rxjs";

import { AuthService, AuthResponse } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"]
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: "Logging in..." })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponse>;
        if (this.isLogin) {
          authObs = this.authService.login(email, password);
        } else {
          authObs = this.authService.signup(email, password);
        }
        authObs.subscribe(
          resData => {
            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl("/places/tabs/search");
          },
          errRes => {
            console.log(errRes);
            loadingEl.dismiss();
            const code = errRes.error.error.message;
            let message = "Could not sign you up, please try again.";
            if (code === "EMAIL_EXISTS") {
              message = "This email address exists already!";
            } else if (code === "EMAIL_NOT_FOUND") {
              message = "E-Mail address could not be found.";
            } else if (code === "INVALID_PASSWORD") {
              message = "This password is not correct.";
            }
            this.showAlert(message);
          }
        );
      });
  }

  onSwitchMode(form) {
    this.isLogin = !this.isLogin;

    const email = form.value.email;
    const password = form.value.password;

    if (email.length === 0 || password.length === 0) {
      this.toastController
        .create({
          duration: 3000,
          showCloseButton: true,
          message: "Informe o email e senha"
        })
        .then(toastControllerElement => {
          toastControllerElement.present();
        });
    }
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authenticate(email, password);
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: "Authentication failed",
        message: message,
        buttons: ["Okay"]
      })
      .then(alertEl => alertEl.present());
  }

  loginByFacebook() {
    this.loadingCtrl
      .create({
        message: "Facebook Login..."
      })
      .then(loadingElement => {
        loadingElement.present();
        this.authService
          .doFacebookLogin()
          .then(res => {
            loadingElement.dismiss();
            console.log(res.credential);
            console.log(res);
            this.authService.createNewUser(
              res.user.email,
              res.user.email,
              res.credential.accessToken,
              new Date().getTime() + 5 * 24 * 60 * 60
            );

            this.router.navigateByUrl("/places/tabs/search");
          })
          .catch(err => {
            loadingElement.dismiss();
            this.showAlert("Error");
            console.log(err);
          });
      });
  }
}

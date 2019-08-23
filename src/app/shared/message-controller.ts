import { Injectable } from '@angular/core';
import { ToastController } from "@ionic/angular";
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class MessageController {
  constructor(private _toastController: ToastController, private _router: Router) {}

  createNessage(message: string, navigateTo: string) {
    this._toastController.create({
      message,
      showCloseButton: true,
      duration: 1800
    }).then( toastElement => {
        toastElement.present();
        this._router.navigateByUrl(navigateTo);
    } );
  }
}

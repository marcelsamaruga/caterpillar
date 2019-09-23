import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { Camera } from '@ionic-native/camera/ngx';
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

// npm install ionic-gallery-modal --save
// npm install --save @ionic/storage
// ionic cordova plugin add cordova-plugin-camera
// npm install @ionic-native/camera
// ionic capacitor add android
// npm install --save @ionic/pwa-elements
// npm install -g @angular/cli
// cordova plugin add cordova-plugin-camera
// npm i firebase angularfire2 --save
// npm install @angular/fire firebase --save
// ionic cordova prepare
// npm install firebaseui --save
// ionic cordova plugin add cordova-plugin-camera
// npm install @ionic-native/camera
// ionic cordova platform add android
// ionic cordova platform add ios
// ionic cordova run android --device
// ionic cordova platform 
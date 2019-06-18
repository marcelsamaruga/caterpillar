import { NavParams, ModalController } from "@ionic/angular";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-photo-modal",
  templateUrl: "./photo-modal.page.html",
  styleUrls: ["./photo-modal.page.scss"]
})
export class PhotoModalPage implements OnInit {
  @ViewChild("slider", { read: ElementRef }) slider: ElementRef;
  img: any;

  sliderOpts = {
    zoom: {
      maxRatio: 3
    },
    slidesPerView: 1.5,
    spaceBetween: 20,
    centeredSlides: true
  };

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.img = this.navParams.get("img");
  }

  ionViewDidEnter() {
    this.zoom(true);
  }

  zoom(zoomIn: boolean) {
    const zoom = this.slider.nativeElement.swiper.zoom;
    if (zoomIn) {
      zoom.in();
    } else {
      zoom.out();
    }
  }

  close() {
    this.modalController.dismiss();
  }
}

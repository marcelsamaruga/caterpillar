import { ModalController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-filter-modal",
  templateUrl: "./filter-modal.page.html",
  styleUrls: ["./filter-modal.page.scss"]
})
export class FilterModalPage implements OnInit {
  dateFilter: string;
  nameFilter: string;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss({
      dateFilter: this.dateFilter,
      nameFilter: this.nameFilter
    },
    "confirm");
  }
}

import { ModalController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-filter-modal",
  templateUrl: "./filter-modal.page.html",
  styleUrls: ["./filter-modal.page.scss"]
})
export class FilterModalPage {
  dateFilter: string;
  nameFilter: string;

  constructor(private modalController: ModalController) {}

  dismissModal() {
    const data = {
      dateFilter: this.dateFilter,
      nameFilter: this.nameFilter
    };

    this.modalController.dismiss(data, "confirm");
  }

  cancelModal() {
    this.modalController.dismiss({}, "cancel");
  }
}

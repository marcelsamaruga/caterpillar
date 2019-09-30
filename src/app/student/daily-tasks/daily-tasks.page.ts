import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Observable } from "rxjs";
import { StudentService } from "../student.service";
import { AuthService } from "./../../auth/auth.service";
import { Student } from "./../student.model";
import { FilterModalPage } from "./filter-modal/filter-modal.page";

@Component({
  selector: "app-daily-tasks",
  templateUrl: "./daily-tasks.page.html",
  styleUrls: ["./daily-tasks.page.scss"]
})
export class DailyTasksPage implements OnInit {
  students$: Observable<Student[]>;
  userPhoto$: Observable<string>;
  taskDate: string = new Date().toISOString().substring(0, 10);

  constructor(
    private studentService: StudentService,
    private authService: AuthService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.students$ = this.studentService.getStudents();
    this.userPhoto$ = this.authService.getUserPhotoUrl();
  }

  getToday(): string {
    return new Date().toISOString().substring(0, 10);
  }

  onShowDailyFilterModal() {
    this.modalController
      .create({
        component: FilterModalPage
      })
      .then(modalElement => {
        modalElement.present();
        return modalElement.onDidDismiss();
      })
      .then(modalResult => {
        if (modalResult && modalResult.data && modalResult.role === "confirm") {
          const dateFilter = modalResult.data.dateFilter;
          const nameFilter = modalResult.data.nameFilter;

          if (dateFilter) {
            this.taskDate = dateFilter.substring(0, 10);
          }

          if (nameFilter) {
            this.students$ = null;
            this.students$ = this.studentService.getStudentByName(nameFilter);
          }
        }
      });
  }
}

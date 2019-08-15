import { ModalController } from '@ionic/angular';
import { AuthService } from './../../auth/auth.service';
import { StudentService } from "../student.service";
import { Student } from "./../student.model";
import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';

@Component({
  selector: "app-daily-tasks",
  templateUrl: "./daily-tasks.page.html",
  styleUrls: ["./daily-tasks.page.scss"]
})
export class DailyTasksPage implements OnInit {
  students$: Observable<Student[]>;
  userPhoto$: Observable<string>;

  constructor(
    private studentService: StudentService,
    private authService: AuthService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.students$  = this.studentService.getStudents();
    this.userPhoto$ = this.authService.getUserPhotoUrl();
  }

  getToday(): string {
    return new Date().toISOString().substring(0, 10);
  }

  onShowDailyFilterModal() {

  }
}

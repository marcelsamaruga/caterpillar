import { AuthService } from "./../auth/auth.service";
import { StudentService } from "./student.service";
import { Component, OnInit } from "@angular/core";
import { Student } from "./student.model";
import { Observable } from "rxjs";

@Component({
  selector: "app-student",
  templateUrl: "./student.page.html",
  styleUrls: ["./student.page.scss"]
})
export class StudentPage implements OnInit {
  students$: Observable<Student[]>;
  userPhoto$: Observable<string>;
  isLoading = false;

  constructor(
    private studentService: StudentService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userPhoto$ = this.authService.getUserPhotoUrl();
  }

  ionViewDidEnter() {
    this.isLoading = true;
    this.students$ = this.studentService.getStudents();
    this.students$.subscribe(() => this.isLoading = false);
  }

  getToday(): string {
    return new Date().toISOString().substring(0, 10);
  }

  showDailyTasks(idStudent: string) {}

  showPhotos(idStudent: string) {}
}

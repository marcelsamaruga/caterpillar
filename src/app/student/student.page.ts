import { AuthService } from './../auth/auth.service';
import { StudentService } from "./student.service";
import { Component, OnInit } from "@angular/core";
import { Student } from "./student.model";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';

@Component({
  selector: "app-student",
  templateUrl: "./student.page.html",
  styleUrls: ["./student.page.scss"]
})
export class StudentPage implements OnInit {
  students: Student[] = [];
  userPhoto$: Observable<string>;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userPhoto$ = this.authService.getUserPhotoUrl();
  }

  ionViewDidEnter() {
    this.studentService
      .getStudents()
      .subscribe(students => (this.students = students));
  }

  showDailyTasks(idStudent: string) {}

  showPhotos(idStudent: string) {}
}

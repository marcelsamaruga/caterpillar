import { AuthService } from './../auth/auth.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { StudentService } from "./student.service";
import { Component, OnInit } from "@angular/core";
import { Student } from "./student.model";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: "app-student",
  templateUrl: "./student.page.html",
  styleUrls: ["./student.page.scss"]
})
export class StudentPage {
  students: Student[] = [];

  constructor(
    private studentService: StudentService,
    private router: Router,
  ) {}

  ionViewDidEnter() {
    this.studentService
      .getStudents()
      .subscribe(students => (this.students = students));
  }

  showDailyTasks(idStudent: string) {}

  showPhotos(idStudent: string) {}
}

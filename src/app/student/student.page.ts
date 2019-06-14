import { StudentService } from './student.service';
import { Component } from '@angular/core';
import { Student } from './student.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage {
  students: Student[] = [];

  constructor(private studentService: StudentService, private router: Router) { }

  ionViewDidEnter() {
    this.students = this.studentService.getStudents();
    console.log(this.students);
  }

  showDailyTasks(idStudent: string) {

  }

  showPhotos(idStudent: string) {
    
  }

}

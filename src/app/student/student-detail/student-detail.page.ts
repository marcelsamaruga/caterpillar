import { Student } from './../student.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.page.html',
  styleUrls: ['./student-detail.page.scss'],
})
export class StudentDetailPage implements OnInit {
  student: Student;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    //
  }

}

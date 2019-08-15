import { AuthService } from './../../../auth/auth.service';
import { Task } from "./../model/tasks.model";
import { DailyTasksService } from "./../daily-tasks.service";
import { StudentService } from "./../../student.service";
import { Student } from "../../student.model";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { Observable } from 'rxjs';

@Component({
  selector: "app-daily-tasks-detail",
  templateUrl: "./daily-tasks-detail.page.html",
  styleUrls: ["./daily-tasks-detail.page.scss"]
})
export class DailyTasksDetailPage implements OnInit {
  student: Student;
  taskDate: string = new Date().toISOString().substring(0, 10);
  task: Task;

  // controls
  showMeals    = false;
  showSleeping = false;
  showDiapers  = false;
  showActivity = false;

  userPhoto$: Observable<string>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private dailyTasksService: DailyTasksService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has("studentId")) {
        this.router.navigateByUrl("/");
      }

      const studentId = paramMap.get("studentId");

      // doc ref tasks/student/date

      this.studentService.getStudentById(studentId).subscribe(student => {
        this.student = student;

        if (paramMap.has("taskDate")) {
          this.taskDate = paramMap.get("taskDate");
        }

        //todo remove
        this.dailyTasksService.getAllTasks();

        this.task = this.dailyTasksService.getTasksByStudentAndTaskDate(
          studentId,
          this.taskDate
        );
      });
    });

    this.userPhoto$ = this.authService.getUserPhotoUrl();
  }

  onChangeSegment(event) {
    console.log(event.detail.value);
    this.showMeals    = event.detail.value === 'meals';
    this.showSleeping = event.detail.value === 'sleeping';
    this.showDiapers  = event.detail.value === 'diapers';
    this.showActivity = event.detail.value === 'activity';
  }
}

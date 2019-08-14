import { Task } from "./../model/tasks.model";
import { DailyTasksService } from "./../daily-tasks.service";
import { StudentService } from "./../../student.service";
import { Student } from "../../student.model";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";

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
  showMeals = false;
  showSleeping = false;
  showDiapers = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private dailyTasksService: DailyTasksService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has("studentId")) {
        this.router.navigateByUrl("/");
      }

      const studentId = paramMap.get("studentId");

      this.studentService.getStudentById(studentId).subscribe(student => {
        this.student = student;

        if (paramMap.has("taskDate")) {
          this.taskDate = paramMap.get("taskDate");
        }

        this.task = this.dailyTasksService.getTasksByStudentAndTaskDate(
          studentId,
          this.taskDate
        );
      });
    });
  }

  onChangeSegment(event) {
    console.log(event);
    this.showMeals = event.detail.value === 'meals';
    this.showSleeping = event.detail.value === 'sleeping';
    this.showDiapers = event.detail.value === 'diapers';
  }
}

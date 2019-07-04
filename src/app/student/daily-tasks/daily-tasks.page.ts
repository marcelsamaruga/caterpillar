import { DailyTasksService } from "./daily-tasks.service";
import { ActivatedRoute } from "@angular/router";
import { StudentService } from "../student.service";
import { Student } from "./../student.model";
import { Component, OnInit } from "@angular/core";
import { Task } from "./model/tasks.model";

@Component({
  selector: "app-daily-tasks",
  templateUrl: "./daily-tasks.page.html",
  styleUrls: ["./daily-tasks.page.scss"]
})
export class DailyTasksPage implements OnInit {
  tasks: Task[];
  students: Student[];
  showAll = false;

  constructor(
    private studentService: StudentService,
    private activatedRouter: ActivatedRoute,
    private taskService: DailyTasksService
  ) {}

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      if (paramMap.has("studentId")) {
        this.tasks = this.taskService.getTasksByStudent(
          paramMap.get("studentId")
        );
      } else {
        this.studentService.getStudents().subscribe(
          students => {
            this.students = students;
            this.students.forEach( student => {
              student.tasks = this.taskService.getTasksByStudent(student.id);
            } );
          }
        );
        this.showAll = true;
      }
    });
  }

  searchTask(){

  }

  onShowAll() {
    
  }
}

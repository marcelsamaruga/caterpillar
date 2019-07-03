import { StudentService } from "./../student.service";
import { Student } from "./../student.model";
import { Injectable, OnInit } from "@angular/core";
import { BreastFeed } from "./model/breastfeed.model";
import { DiaperChange } from "./model/diaper-change.model";
import { Task } from "./model/tasks.model";

@Injectable({
  providedIn: "root"
})
export class DailyTasksService implements OnInit {
  tasks: Task[] = [];
  student: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.student = this.studentService.getStudents();
    this.tasks.push(
      new Task(
        "1",
        new Date(),
        new Student("1", "Ben", "", "41", "Costa"),
        [new DiaperChange("1")],
        [
          new BreastFeed("1", 100, false, true),
          new BreastFeed("2", 200, true, true)
        ],
        true,
        false
      )
    );
  }

  getTasks() {
    return this.tasks;
  }

  getTasksByStudent(studentId: string): Task[] {
    const studentTasks = [];
    this.tasks.filter( task => {
      if (task.student.id === studentId) {
        studentTasks.push(task);
      }
    });

    return studentTasks;
  }
}

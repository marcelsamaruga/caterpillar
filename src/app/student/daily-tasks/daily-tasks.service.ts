import { FoodQuantity } from './model/food-quantity.enum';
import { MealType } from './model/meal-type.enum';
import { StudentService } from "./../student.service";
import { Student } from "./../student.model";
import { Injectable, OnInit } from "@angular/core";
import { BreastFeed } from "./model/breastfeed.model";
import { DiaperChange } from "./model/diaper-change.model";
import { Task } from "./model/tasks.model";
import { Meal } from './model/meal.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class DailyTasksService implements OnInit {
  tasks: Task[] = [];
  students$: Observable<Student[]>;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.students$ = this.studentService.getStudents();
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

  getTasksByStudentAndTaskDate(studentId: string, taskDate: string): Task {
    const taskFound: Task[] = this.tasks.filter( task => {
        return task.date.toISOString().substring(0, 10) === taskDate
                && task.student.id === studentId;
    } );
    return taskFound[0];
  }

  getAllTasks() {
    this.tasks.push(
      new Task(
        "1",
        new Date(),
        new Student("TVnW46cJqgjUNS9RyRju", "Ben", "", "41", "Costa"),
        [new DiaperChange("1")],
        [
          new BreastFeed("1", 100, false, true),
          new BreastFeed("2", 200, true, true)
        ],
        true,
        false,
        [ 
          new Meal( "1", MealType.Breakfast, FoodQuantity.Few ),
          new Meal( "2", MealType.Lunch, FoodQuantity.Havent ),
          new Meal( "3", MealType.Snack, FoodQuantity.Good ),
          new Meal( "4", MealType.Soup, FoodQuantity.Good )
         ]
      )
    );
  }
}

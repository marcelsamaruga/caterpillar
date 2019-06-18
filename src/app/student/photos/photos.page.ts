import { StudentService } from "./../student.service";
import { Student } from "./../student.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-photos",
  templateUrl: "./photos.page.html",
  styleUrls: ["./photos.page.scss"]
})
export class PhotosPage implements OnInit {
  students: Student[];

  constructor(
    private activateRouter: ActivatedRoute,
    private navController: NavController,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.activateRouter.paramMap.subscribe(params => {
      console.log(params);
      if (params.has("studentId")) {
        this.students.push(
          this.studentService.getStudentById(params.get("studentId"))
        );
      } else {
        this.students = this.studentService.getStudents();
      }
    });
  }
}

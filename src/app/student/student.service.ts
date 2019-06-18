import { Photo } from './photos/photo.model';
import { Injectable, OnInit } from "@angular/core";
import { Student } from "./student.model";

@Injectable({
  providedIn: "root"
})
export class StudentService {
  students: Student[] = [];

  constructor() {
    this.students = [
      new Student(
        "1",
        "Ben",
        "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        "41 99999-7777",
        "Costa",
        [ 
          new Photo("https://avante.biz/wp-content/uploads/Wallpaper-Of-Baby/Wallpaper-Of-Baby-051.jpg", new Date("2019-01-05")),
          new Photo("https://rukminim1.flixcart.com/image/704/704/j8esr680/poster/4/a/b/large-poster-cute-baby-poster-babies-poster-collection-of-cute-original-imaeyfswfajgdgbh.jpeg?q=70", new Date("2019-07-11"))
        ],
        new Date("2014-12-24")
      ),
      new Student(
        "2",
        "Ben",
        "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        "41 99999-7777",
        "Costa",
        [ 
          new Photo("https://avante.biz/wp-content/uploads/Wallpaper-Of-Baby/Wallpaper-Of-Baby-051.jpg", new Date("2019-01-05")),
          new Photo("https://rukminim1.flixcart.com/image/704/704/j8esr680/poster/4/a/b/large-poster-cute-baby-poster-babies-poster-collection-of-cute-original-imaeyfswfajgdgbh.jpeg?q=70", new Date("2019-07-11"))
        ],
        new Date("2014-12-24")
      )
    ];
  }

  getStudents() {
    return this.students;
  }

  getStudentById(studentId: string): Student {
    let studentReturned = this.students.filter( student => {
      return student.id === studentId;
    });

    return studentReturned[0];
  }

  saveStudent(firstName: string, imageUrl: string, contact1: string, lastName?: string, birthday?: Date) {
    const newStudent = new Student( "2", firstName, imageUrl, contact1, lastName, null, birthday );
    this.students.push( newStudent );
    return newStudent.id;
  }
}

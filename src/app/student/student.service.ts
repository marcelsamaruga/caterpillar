import { Photo } from './photos/photo.model';
import { Injectable, OnInit } from "@angular/core";
import { Student } from "./student.model";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class StudentService implements OnInit {
  students: Student[] = [];
  dbStudentCollection: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.dbStudentCollection = db.collection<Student>("students");
    this.students = [
      new Student(
        "1",
        "Ben",
        "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        "41 99999-7777",
        "Costa",
        [
          new Photo(
            "https://avante.biz/wp-content/uploads/Wallpaper-Of-Baby/Wallpaper-Of-Baby-051.jpg",
            new Date("2019-01-05")
          ),
          new Photo(
            "https://rukminim1.flixcart.com/image/704/704/j8esr680/poster/4/a/b/large-poster-cute-baby-poster-babies-poster-collection-of-cute-original-imaeyfswfajgdgbh.jpeg?q=70",
            new Date("2019-07-11")
          )
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
          new Photo(
            "https://avante.biz/wp-content/uploads/Wallpaper-Of-Baby/Wallpaper-Of-Baby-051.jpg",
            new Date("2019-01-05")
          ),
          new Photo(
            "https://rukminim1.flixcart.com/image/704/704/j8esr680/poster/4/a/b/large-poster-cute-baby-poster-babies-poster-collection-of-cute-original-imaeyfswfajgdgbh.jpeg?q=70",
            new Date("2019-07-11")
          )
        ],
        new Date("2014-12-24")
      )
    ];
  }

  ngOnInit() {
    
  }

  getStudents() {
    //this.db.collection("students", ref => ref.orderBy("firstName"));
    return this.students;
  }

  getStudentById(studentId: string): Student {
    const studentReturned = this.students.filter(student => {
      return student;
    });

    return studentReturned[0];
  }

  async saveStudent(
    firstName: string,
    imageUrl: any,
    contact1: string,
    contact2: string,
    lastName?: string,
    birthday?: Date
  ) {
    const newStudent = new Student(
      firstName,
      imageUrl,
      contact1,
      lastName,
      null,
      null
    );

    //await this.dbStudentCollection.add(newStudent);
    //return newId;
    await this.db
          .collection("students")
          .add( {
            firstName: firstName,
            contact1: contact1,
            imageUrl: imageUrl
          });
  }
}

import { Injectable } from "@angular/core";
import { Student } from "./student.model";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { map, first } from "rxjs/operators";
import { Observable, from } from "rxjs";
import { convertDBSnapshots, convertDBSnapshotsByOne } from "../shared/utils";
import { AngularFireStorage } from "@angular/fire/storage";

@Injectable({
  providedIn: "root"
})
export class StudentService {
  dbStudentCollection: AngularFirestoreCollection;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.dbStudentCollection = db.collection<Student>("students");
  }

  getStudents(): Observable<Student[]> {
    return this.db
      .collection("students", ref => ref.orderBy("firstName"))
      .snapshotChanges()
      .pipe(
        map(snapshots => {
          return convertDBSnapshots<Student>(snapshots);
        }),
        first()
      );
  }

  getStudentByName(studentName: string): Observable<Student[]> {
    return this.db
      .collection("students", ref =>
        ref
          .where("firstName", ">=", studentName)
          .where("firstName", "<=", studentName + "\uf8ff")
          .orderBy("firstName")
      )
      .snapshotChanges()
      .pipe(
        map(snapshots => {
          return convertDBSnapshots<Student>(snapshots);
        }),
        first()
      );
  }

  getStudentById(studentId: string): Observable<Student> {
    return this.db
      .doc("students/" + studentId)
      .snapshotChanges()
      .pipe(
        map(snapshots => {
          return convertDBSnapshotsByOne<Student>(snapshots);
        }),
        first()
      );
  }

  saveStudent(student: Partial<Student>): Observable<any> {
    if (student.id && student.id !== "") {
      return from(this.db.doc("students/" + student.id).update(student));
    } else {
      return from(this.db.collection("students").add(student));
    }
  }

  uploadProfileImage(studentId: string, file: string): Observable<any> {
    const profileRef = this.storage.ref(
      `/images/profiles/${studentId}/${file}`
    );
    return from(profileRef.putString(file));
  }

  getProfileImage(studentId: string): Observable<any> {
    return this.storage
      .ref(`images/profiles/${studentId}/profile.jpg`)
      .getDownloadURL();
  }
}

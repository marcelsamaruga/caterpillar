import { Injectable, OnInit } from '@angular/core';
import { Student } from './student.model';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { map, first } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { convertDBSnapshots } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  students: Student[] = [];
  dbStudentCollection: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.dbStudentCollection = db.collection<Student>('students');
  }

  getStudents(): Observable<Student[]> {
    return this.db
      .collection('students', ref => ref.orderBy('firstName'))
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
      .collection('students', ref => ref.where('id', '==', studentId))
      .snapshotChanges()
      .pipe(
        map(snapshots => {
          const students = convertDBSnapshots<Student>(snapshots);
          return students.length === 1 ? students[0] : undefined;
        }),
        first()
      );
  }

  saveStudent(student: Partial<Student>): Observable<any> {
    if (student.id && student.id !== '') {
      return from(this.db.doc('students/' + student.id).update(student));
    } else {
      console.log(student);
      /*return from( this.db.doc('students')
        .set( student ) );*/
      return from(this.db.collection('students').add(student));
    }
  }
}

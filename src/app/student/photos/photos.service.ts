import { Injectable } from '@angular/core';
import { Student } from '../student.model';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { map, first } from 'rxjs/operators';
import { convertDBSnapshots } from '../../shared/utils';
import { Photo } from './photo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  dbPhotosCollection: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.dbPhotosCollection = db.collection<Student>('students');
  }

  getPhotosByStudent(studentId: string): Observable<Photo[]> {
    return this.db
      .collection(`students/${studentId}/photos`)
      .snapshotChanges()
      .pipe(
        map(snapshots => {
          return convertDBSnapshots<Photo>(snapshots);
        }),
        first()
      );
  }
}

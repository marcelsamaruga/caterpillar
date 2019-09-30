import { AuthService } from "./../../auth/auth.service";
import { PhotoModalPage } from "./photo-modal/photo-modal.page";
import { StudentService } from "./../student.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { Observable } from "rxjs";
import { PhotosService } from "./photos.service";
import { last, map, concatMap, first, take } from "rxjs/operators";

@Component({
  selector: "app-photos",
  templateUrl: "./photos.page.html",
  styleUrls: ["./photos.page.scss"]
})
export class PhotosPage implements OnInit {
  students$: Observable<any>;
  userPhoto$: Observable<string>;
  isLoading = false;

  sliderConfig = {
    slidesPerView: 1.3,
    spaceBetween: 7,
    centeredSlides: false,
    slideShadows: true,
    watchSlidesProgress: true,
    initialSlide: 1,
    speed: 400
  };

  constructor(
    private activateRouter: ActivatedRoute,
    private studentService: StudentService,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private photoService: PhotosService
  ) {}

  ngOnInit() {
    this.isLoading = true;

    const studentId = this.activateRouter.snapshot.paramMap.get("studentId");

    if (studentId) {
      this.students$ = this.studentService.getStudentById(studentId).pipe(
        map(student => {
          student.photo = this.photoService.getPhotosByStudent(student.id);
          return [student];
        }),
        last()
      );
    } else {
      this.students$ = this.studentService.getStudents().pipe(
        map(students => {
          const studentsMap = [];

          students.forEach(student => {
            student.photo = this.photoService.getPhotosByStudent(student.id);
            studentsMap.push(student);
          });

          return studentsMap;
        }),
        last()
      );
    }

    this.userPhoto$ = this.authService.getUserPhotoUrl();

    this.students$.subscribe(() => (this.isLoading = false));
  }

  onOpenGallery(image: string) {
    this.modalCtrl
      .create({
        component: PhotoModalPage,
        componentProps: {
          img: image
        }
      })
      .then(modal => {
        modal.present();
      });
  }
}

import { AuthService } from "./../../auth/auth.service";
import { StudentService } from "./../student.service";
import { ActivatedRoute } from "@angular/router";
import { Student } from "./../student.model";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AlertController } from "@ionic/angular";
import { Observable } from "rxjs";
import { MessageController } from "src/app/shared/message-controller";
import {
  CameraOptions,
  Camera,
  PictureSourceType
} from "@ionic-native/camera/ngx";
import { last, switchMap } from "rxjs/operators";

@Component({
  selector: "app-student-details",
  templateUrl: "./student-details.page.html",
  styleUrls: ["./student-details.page.scss"]
})
export class StudentDetailsPage implements OnInit {
  form: FormGroup;
  student$: Observable<Student>;
  userPhoto$: Observable<string>;
  studentId: string;
  imageProfile: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private authService: AuthService,
    private alertController: AlertController,
    private messageController: MessageController,
    private camera: Camera
  ) {}

  ngOnInit() {
    const studentId = this.activatedRoute.snapshot.paramMap.get("studentId");
    this.createForm();

    if (studentId) {
      this.student$ = this.studentService.getStudentById(studentId);
      this.student$.subscribe(student => {
        this.studentId = student.id;
        this.imageProfile = student.imageProfile;

        this.createForm(
          student.firstName,
          student.lastName,
          student.contact1,
          student.contact2,
          student.birthday,
          student.imageProfile
        );
      });
    }

    // user profile
    this.userPhoto$ = this.authService.getUserPhotoUrl();
  }

  createForm(
    firstName?,
    lastName?,
    contact1?,
    contact2?,
    birthday?,
    imageProfile?
  ) {
    this.form = new FormGroup({
      firstName: new FormControl(firstName, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      lastName: new FormControl(lastName, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      contact1: new FormControl(contact1, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      contact2: new FormControl(contact2, {
        updateOn: "blur"
      }),
      birthday: new FormControl(birthday, {
        updateOn: "blur"
      }),
      imageProfile: new FormControl(imageProfile)
    });
  }

  onSaveStudent() {
    if (!this.form.valid) {
      return;
    }

    let birthdayDate = null;

    if (this.form.value["birthday"]) {
      birthdayDate = this.form.value["birthday"];
    }

    const studentDb = {
      id: this.studentId ? this.studentId : undefined,
      firstName: this.form.value["firstName"],
      contact1: this.form.value["contact1"],
      lastName: this.form.value["lastName"],
      birthday: birthdayDate,
      contact2: this.form.value["contact2"],
      imageProfile: this.imageProfile
    };

    this.studentService
      .saveStudent(studentDb)
      .pipe(
        last(),
        switchMap(student => {
          return this.studentService.uploadProfileImage(
            student,
            this.imageProfile
          );
        })
      )
      .subscribe(() => {
        this.messageController.createNessage(
          "Aluno salvo com sucesso",
          "/student"
        );
      });
  }

  onDeleteStudent() {}

  async onChooseImageSource() {
    const alert = await this.alertController.create({
      header: "Foto de perfil",
      message: "Favor escolher o tipo de imagem:",
      buttons: [
        {
          text: "Camera",
          handler: () => {
            this.camera.getPicture(this.createCameraOptions()).then(image => {
              this.imageProfile = "data:image/jpeg;base64," + image;
            });
          }
        },
        {
          text: "Galeria",
          handler: () => {
            this.camera
              .getPicture(
                this.createCameraOptions(
                  100,
                  PictureSourceType.PHOTOLIBRARY,
                  200
                )
              )
              .then(image => {
                this.imageProfile = "data:image/jpeg;base64," + image;
              });
          }
        }
      ]
    });

    await alert.present();
  }

  createCameraOptions(
    quality = 100,
    sourceType: PictureSourceType = PictureSourceType.CAMERA,
    targetHeight = 200
  ): CameraOptions {
    return {
      quality,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight,
      sourceType
    };
  }
}
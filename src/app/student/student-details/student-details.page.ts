import { tap, switchMap, first } from "rxjs/operators";
import { AuthService } from "./../../auth/auth.service";
import { StudentService } from "./../student.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Student } from "./../student.model";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastController } from "@ionic/angular";
import { Observable, Subscription } from "rxjs";
import { map, take } from "rxjs/operators";

function base64toBlob(base64Data, contentType) {
  contentType = contentType || "";
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: "app-student-details",
  templateUrl: "./student-details.page.html",
  styleUrls: ["./student-details.page.scss"]
})
export class StudentDetailsPage implements OnInit {
  form: FormGroup;
  student: Student;
  student$: Observable<Student>;
  studentSub: Subscription;
  firstName: string;
  imagePicked: string;
  imageBlob: any;

  userPhoto$: Observable<string>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private toastController: ToastController,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const studenId = this.activatedRoute.snapshot.paramMap.get("studentId");
    this.createForm();

    if (studenId) {
      this.studentSub = this.studentService
        .getStudentById(studenId)
        .subscribe(student => {
          this.student = student;
          this.createForm(
            student.firstName,
            student.lastName,
            student.contact1,
            student.contact2,
            student.birthday,
            student.imageUrl
          );
        });
    } else {
      this.createForm();
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
    imageUrl?
  ) {

    if (imageUrl) {
      const fr = new FileReader();
      fr.onload = () => {
        const imagePath = fr.result.toString();
        this.imagePicked = imagePath;
      };

      fr.readAsBinaryString(imageUrl);
    }

    if (birthday) {
      birthday = birthday.toISOString();
    }

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
      imageUrl: new FormControl(imageUrl)
    });
  }

  onSaveStudent() {
    if (!this.form.valid) {
      return;
    }

    let birthdayDate = null;

    if (this.form.value["birthday"]) {
      birthdayDate = new Date(this.form.value["birthday"]);
    }

    const newStudent = {
      id: this.student && this.student.id ? this.student.id : undefined,
      firstName: this.form.value["firstName"],
      //imageUrl: this.imageBlob,
      contact1: this.form.value["contact1"],
      lastName: this.form.value["lastName"],
      birthday: birthdayDate,
      contact2: this.form.value["contact2"]
    };

    this.studentService.saveStudent(newStudent).subscribe(student => {
      this.toastController
        .create({
          message: "Registro salvo",
          showCloseButton: true,
          duration: 1800
        })
        .then(toastControllerElement => {
          toastControllerElement.present();
          this.router.navigateByUrl("/student");
        });
    });
  }

  onDeleteStudent() {}

  onImagePicked(imageData: string | File) {
    /*let imageFile;
    if (typeof imageData === "string") {
      console.log('a');
      try {
        imageFile = base64toBlob(
          imageData.replace("data:image/jpeg;base64,", ""),
          "image/jpeg"
        );
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      console.log('aj');
      imageFile = imageData;
    }
    this.form.patchValue({ imageUrl: imageFile });*/
    let imageFile;

    if (typeof imageData === "string") {
      //this.imagePicked = imageData;
      imageFile = base64toBlob(
        imageData.replace("data:image/jpeg;base64,", ""),
        "image/jpeg"
      );
      this.imageBlob = imageFile;
    }
  }
}

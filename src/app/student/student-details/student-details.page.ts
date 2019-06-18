import { StudentService } from "./../student.service";
import { ActivatedRoute } from "@angular/router";
import { Student } from "./../student.model";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastController } from "@ionic/angular";

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
  firstName: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramsMap => {
      if (paramsMap.has("studentId")) {
        this.student = this.studentService.getStudentById(
          paramsMap.get("studentId")
        );
      }
    });

    let firstName = null;
    let lastName  = null;
    let contact1  = null;
    let contact2  = null;
    let birthday  = null;
    let imageUrl  = null;

    if ( this.student ) {
      firstName = this.student.firstName;
      lastName = this.student.lastName;
      contact1 = this.student.contact1;
      contact2 = this.student.contact2;
      imageUrl = this.student.imageUrl;
      birthday = this.student.birthday.toISOString();
    }

    this.form = new FormGroup({
      firstName: new FormControl( firstName, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      lastName: new FormControl( lastName, {
        updateOn: 'blur'
      }),
      contact1: new FormControl( contact1, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      contact2: new FormControl( contact2, {
        updateOn: 'blur'
      }),
      birthday: new FormControl( birthday, {
        updateOn: 'blur'
      }),
      imagemUrl: new FormControl( imageUrl )
    });

  }

  onSaveStudent() {
    if (!this.form.valid) {
      return;
    }

    let birthday = null;

    if (this.form.value["birthday"]) {
      birthday = new Date(this.form.value["birthday"]);
    }

    this.studentService.saveStudent(
      this.form.value["firstName"],
      null,
      this.form.value["lastName"],
      birthday
    );
    console.log(this.studentService.getStudents());

    this.toastController
      .create({
        message: "Registro salvo",
        showCloseButton: true,
        duration: 1800
      })
      .then(toastControllerElement => {
        toastControllerElement.present();
      });
  }

  onDeleteStudent() {}

  onImagePicked(imageData: string | File) {
    let imageFile;
    if (typeof imageData === "string") {
      //this.imageUrlStr = "data:image/jpeg;base64," + imageData;
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
      imageFile = imageData;
    }
  }
}

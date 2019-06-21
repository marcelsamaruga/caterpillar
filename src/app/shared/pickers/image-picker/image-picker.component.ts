import { Platform } from "@ionic/angular";
import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  ElementRef,
  Output,
  Input
} from "@angular/core";
import {
  Plugins,
  Capacitor,
  CameraSource,
  CameraResultType
} from "@capacitor/core";


@Component({
  selector: "app-image-picker",
  templateUrl: "./image-picker.component.html",
  styleUrls: ["./image-picker.component.scss"]
})
export class ImagePickerComponent implements OnInit {
  @ViewChild("filePicker") filePickerRef: ElementRef<HTMLInputElement>;
  @Output() imagePickEmitter = new EventEmitter<string | File>();
  selectedImage: string;
  @Input() selectedImageInput;

  constructor() {}

  ngOnInit() {
    if (this.selectedImageInput) {
      this.selectedImage = this.selectedImageInput;
    }
  }

  onPickImage() {
    if (!Capacitor.isPluginAvailable("Camera")) {
      this.filePickerRef.nativeElement.click();
      return;
    }

    Plugins.Camera.getPhoto({
      quality: 50,
      resultType: CameraResultType.Base64,
      height: 320,
      width: 300,
      correctOrientation: true,
      source: CameraSource.Prompt
    })
      .then(imageSelected => {
        this.selectedImage = "data:image/jpeg;base64," + imageSelected;
        this.imagePickEmitter.emit(btoa(this.selectedImage));
      })
      .catch(err => {
        console.log(err);
        this.filePickerRef.nativeElement.click();
        return;
      });
  }

  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];

    if (!pickedFile) {
      return;
    }

    const fr = new FileReader();
    fr.onload = () => {
      const imagePath = fr.result.toString();
      this.selectedImage = imagePath;
      this.imagePickEmitter.emit(btoa(imagePath));
    };

    fr.readAsDataURL(pickedFile);
  }

}

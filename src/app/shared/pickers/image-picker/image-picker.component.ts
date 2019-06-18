import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Platform } from "@ionic/angular";
import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  ElementRef,
  Output
} from "@angular/core";
import { Capacitor } from "@capacitor/core";

@Component({
  selector: "app-image-picker",
  templateUrl: "./image-picker.component.html",
  styleUrls: ["./image-picker.component.scss"]
})
export class ImagePickerComponent implements OnInit {
  @ViewChild("filePicker") filePickerRef: ElementRef<HTMLInputElement>;
  @Output() imagePickEmitter = new EventEmitter<string | File>();
  selectedImage: string;
  usePicker = false;

  constructor(private platform: Platform, private camera: Camera) {}

  ngOnInit() {
    if (
      (this.platform.is("mobile") && !this.platform.is("hybrid")) ||
      this.platform.is("desktop")
    ) {
      this.usePicker = true;
    }
  }

  onPickImage() {
    if (!Capacitor.isPluginAvailable("Camera")) {
      this.filePickerRef.nativeElement.click();
      return;
    }

    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera
      .getPicture(cameraOptions)
        .then(imageData => {
          this.selectedImage = "data:image/jpeg;base64," + imageData;
          this.imagePickEmitter.emit(this.selectedImage);
        })
        .catch(err => {
          if (this.usePicker) {
            this.filePickerRef.nativeElement.click();
          }
          return;
        });
  }

  onFileChoosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];

    if (!pickedFile) {
      return;
    }

    const fr = new FileReader();
    fr.onload = () => {
      const imagePath = fr.result.toString();
      this.selectedImage = imagePath;
      this.imagePickEmitter.emit(imagePath);
    };

    fr.readAsDataURL(pickedFile);
  }
}

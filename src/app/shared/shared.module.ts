import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ImagePickerComponent } from './pickers/image-picker/image-picker.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ImagePickerComponent],
    imports: [CommonModule, IonicModule],
    exports: [ImagePickerComponent],
    entryComponents: []
})
export class SharedModule {

}
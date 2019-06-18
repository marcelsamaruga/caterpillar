import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotosPage } from './photos.page';
import { PhotoModalPage } from './photo-modal/photo-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PhotosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PhotosPage, PhotoModalPage],
  entryComponents: [PhotoModalPage]
})
export class PhotosPageModule {}

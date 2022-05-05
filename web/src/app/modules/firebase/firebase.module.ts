import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../../../environments/environment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
})
export class FirebaseModule {}

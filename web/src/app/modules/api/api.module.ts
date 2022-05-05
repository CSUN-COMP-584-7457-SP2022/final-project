import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FirebaseModule } from '../firebase/firebase.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FirebaseModule, HttpClientModule],
})
export class ApiModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '../../components/components.module';
import { FirebaseModule } from '../../modules/firebase/firebase.module';
import { SignInPageComponent } from './sign-in-page.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';

@NgModule({
  declarations: [SignInPageComponent, SignInFormComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    FirebaseModule,
    RouterModule,
  ],
  exports: [SignInPageComponent],
})
export class SignInPageModule {}

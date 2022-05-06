import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

import { ComponentsModule } from '../../components/components.module';
import { FirebaseModule } from '../../modules/firebase/firebase.module';
import { ApiModule } from '../../modules/api/api.module';
import { NgxBootstrapModule } from 'src/app/modules/ngx-bootstrap/ngx-bootstrap.module';
import { ProfilePageComponent } from './profile-page.component';
import { EditNameFormComponent } from './edit-name-form/edit-name-form.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';
import { UseDiabeticCompassFormComponent } from './use-diabetic-compass-form/use-diabetic-compass-form.component';
import { ResultModalComponent } from './result-modal/result-modal.component';

@NgModule({
  declarations: [
    ProfilePageComponent,
    EditNameFormComponent,
    ResetPasswordFormComponent,
    UseDiabeticCompassFormComponent,
    ResultModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
    FirebaseModule,
    ApiModule,
    NgxBootstrapModule,
  ],
  exports: [ProfilePageComponent],
  providers: [BsModalService],
})
export class ProfilePageModule {}

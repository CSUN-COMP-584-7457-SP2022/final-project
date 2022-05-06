import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgxBootstrapModule } from '../../modules/ngx-bootstrap/ngx-bootstrap.module';
import { FirebaseModule } from '../../modules/firebase/firebase.module';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, NgxBootstrapModule, FirebaseModule, RouterModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}

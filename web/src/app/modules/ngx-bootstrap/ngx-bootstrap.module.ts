import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [ButtonsModule, AlertModule, ModalModule],
})
export class NgxBootstrapModule {}

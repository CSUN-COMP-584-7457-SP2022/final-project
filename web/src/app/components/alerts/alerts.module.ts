import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxBootstrapModule } from '../../modules/ngx-bootstrap/ngx-bootstrap.module';

import { AlertsComponent } from './alerts.component';

@NgModule({
  declarations: [AlertsComponent],
  imports: [CommonModule, NgxBootstrapModule],
  exports: [AlertsComponent],
})
export class AlertsModule {}

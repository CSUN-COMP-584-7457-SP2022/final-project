import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderModule } from './header/header.module';
import { AlertsModule } from './alerts/alerts.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HeaderModule, AlertsModule],
  exports: [HeaderModule, AlertsModule],
})
export class ComponentsModule {}

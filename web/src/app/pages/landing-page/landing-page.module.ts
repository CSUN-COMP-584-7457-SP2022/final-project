import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../../components/components.module';
import { LandingPageComponent } from './landing-page.component';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [CommonModule, ComponentsModule],
  exports: [LandingPageComponent],
})
export class LandingPageModule {}

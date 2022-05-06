import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../../components/components.module';
import { ResourcesPageComponent } from './resources-page.component';
import { WhatIsDiabetesComponent } from './what-is-diabetes/what-is-diabetes.component';
import { RiskFactorsComponent } from './risk-factors/risk-factors.component';
import { SymptomsComponent } from './symptoms/symptoms.component';
import { PrediabetesComponent } from './prediabetes/prediabetes.component';
import { TypeOneDiabetesComponent } from './type-one-diabetes/type-one-diabetes.component';
import { TypeTwoDiabetesComponent } from './type-two-diabetes/type-two-diabetes.component';
import { GestationalDiabetesComponent } from './gestational-diabetes/gestational-diabetes.component';
import { TestingForDiabetesComponent } from './testing-for-diabetes/testing-for-diabetes.component';
import { FastFactsComponent } from './fast-facts/fast-facts.component';

@NgModule({
  declarations: [ResourcesPageComponent, WhatIsDiabetesComponent, RiskFactorsComponent, SymptomsComponent, PrediabetesComponent, TypeOneDiabetesComponent, TypeTwoDiabetesComponent, GestationalDiabetesComponent, TestingForDiabetesComponent, FastFactsComponent],
  imports: [CommonModule, ComponentsModule],
  exports: [ResourcesPageComponent],
})
export class ResourcesPageModule {}

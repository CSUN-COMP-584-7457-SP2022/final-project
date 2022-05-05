import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateAccountPageModule } from './create-account-page/create-account-page.module';
import { LandingPageModule } from './landing-page/landing-page.module';
import { SignInPageModule } from './sign-in-page/sign-in-page.module';
import { ResourcesPageModule } from './resources-page/resources-page.module';
import { ProfilePageModule } from './profile-page/profile-page.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CreateAccountPageModule,
    LandingPageModule,
    SignInPageModule,
    ResourcesPageModule,
    ProfilePageModule,
  ],
  // Necessary to export these modules so any module that imports
  // this module has access to the listed modules
  exports: [
    CreateAccountPageModule,
    LandingPageModule,
    SignInPageModule,
    ResourcesPageModule,
    ProfilePageModule,
  ],
})
export class PagesModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesModule } from './pages/pages.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CreateAccountPageComponent } from './pages/create-account-page/create-account-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { ResourcesPageComponent } from './pages/resources-page/resources-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

const routes: Routes = [
  { path: 'create-account', component: CreateAccountPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'resources', component: ResourcesPageComponent },
  { path: 'sign-in', component: SignInPageComponent },
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [PagesModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { ApiModule } from './modules/api/api.module';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FirebaseModule,
    ApiModule,
    PagesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Component, OnInit } from '@angular/core';

import { Alert } from 'src/app/interfaces/alert';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css'],
})
export class SignInPageComponent implements OnInit {
  alerts: { [id: string]: Alert } = {};

  constructor() {}

  ngOnInit(): void {}

  showAlert(alert: Alert) {
    this.alerts = {
      ...this.alerts,
      [alert.id]: alert,
    };
  }
}

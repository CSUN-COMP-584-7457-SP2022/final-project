import { Component, OnInit } from '@angular/core';

import { Alert } from 'src/app/interfaces/alert';

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrls: ['./create-account-page.component.css'],
})
export class CreateAccountPageComponent implements OnInit {
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

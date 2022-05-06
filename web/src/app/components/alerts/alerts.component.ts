import { Component, OnInit, Input } from '@angular/core';

import { Alert } from 'src/app/interfaces/alert';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
})
export class AlertsComponent implements OnInit {
  @Input() alerts: { [id: string]: Alert } = {};

  constructor() {}

  ngOnInit(): void {}

  onCloseAlert(alertId: string) {
    delete this.alerts[alertId];
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Alert, ALERT_TYPE } from 'src/app/interfaces/alert';
import { makeAlert } from 'src/lib/make-alert';
import { ApiService } from 'src/app/modules/api/api.service';

type UserInfo = {
  email: string;
  firstName: string;
  lastName: string;
} | null;

@Component({
  selector: 'app-edit-name-form',
  templateUrl: './edit-name-form.component.html',
  styleUrls: ['./edit-name-form.component.css'],
})
export class EditNameFormComponent implements OnInit {
  @Input() userInfo: UserInfo = null;
  @Output() alerts = new EventEmitter<Alert>();

  editNameForm: FormGroup;
  showSpinner = false;
  constructor(private api: ApiService) {
    this.editNameForm = new FormGroup({
      firstName: new FormControl(this.userInfo?.firstName),
      lastName: new FormControl(this.userInfo?.lastName),
    });
  }

  ngOnInit(): void {
    if (!this.userInfo) {
      return;
    }

    this.editNameForm.setValue({
      firstName: this.userInfo.firstName,
      lastName: this.userInfo.lastName,
    });
  }

  async onSubmit() {
    if (this.editNameForm.invalid) {
      return;
    }
    this.showSpinner = true;

    try {
      await this.api.post('/users/update-name', this.editNameForm.value);
      this.alerts.emit(
        makeAlert({
          type: ALERT_TYPE.SUCCESS,
          msg: 'Refresh the page to see your changes.',
        })
      );
    } catch (err) {
      console.error(err);
      this.alerts.emit(
        makeAlert({
          type: ALERT_TYPE.WARNING,
          msg: 'Something went wrong! Please try again or contact support.',
        })
      );
    }

    this.showSpinner = false;
  }
}

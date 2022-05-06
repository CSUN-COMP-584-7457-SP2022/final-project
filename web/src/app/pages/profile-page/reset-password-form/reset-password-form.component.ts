import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/modules/firebase/auth.service';
import { Alert, ALERT_TYPE } from 'src/app/interfaces/alert';
import { makeAlert } from 'src/lib/make-alert';

type UserInfo = {
  email: string;
  firstName: string;
  lastName: string;
} | null;

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css'],
})
export class ResetPasswordFormComponent implements OnInit {
  @Input() userInfo: UserInfo = null;
  @Output() alerts = new EventEmitter<Alert>();

  sendPasswordResetEmailForm: FormGroup;
  showSpinner = false;

  constructor(private auth: AuthService) {
    this.sendPasswordResetEmailForm = new FormGroup({
      email: new FormControl(this.userInfo?.email, [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  ngOnInit(): void {
    if (!this.userInfo) {
      return;
    }

    this.sendPasswordResetEmailForm.setValue({ email: this.userInfo.email });
  }

  async onSubmit() {
    if (this.sendPasswordResetEmailForm.invalid) {
      return;
    }

    this.showSpinner = true;

    try {
      await this.auth.sendPasswordResetEmail(
        this.sendPasswordResetEmailForm.value.email
      );

      this.alerts.emit(
        makeAlert({
          type: ALERT_TYPE.SUCCESS,
          msg: 'Please check your email for a password reset link!',
        })
      );

      this.showSpinner = false;
    } catch (err: any) {
      console.error(err);
      this.alerts.emit(
        makeAlert({
          type: ALERT_TYPE.WARNING,
          msg:
            err.statusCode === 422
              ? err.message
              : 'Something went wrong! Please try again or contact support.',
        })
      );
      this.showSpinner = false;
    }
  }
}

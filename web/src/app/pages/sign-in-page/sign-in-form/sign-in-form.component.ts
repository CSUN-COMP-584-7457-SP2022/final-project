import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/modules/firebase/auth.service';
import { Alert, ALERT_TYPE } from 'src/app/interfaces/alert';
import { makeAlert } from 'src/lib/make-alert';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css'],
})
export class SignInFormComponent implements OnInit {
  @Output() alerts = new EventEmitter<Alert>();

  signInForm: FormGroup;
  showSpinner = false;

  constructor(private auth: AuthService, private router: Router) {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    if (this.signInForm.invalid) {
      return;
    }

    this.showSpinner = true;

    try {
      await this.auth.signIn({
        email: this.signInForm.value.email,
        password: this.signInForm.value.password,
      });
    } catch (err: any) {
      this.showSpinner = false;

      if (err.statusCode === 422 && err.code === 'auth/too-many-requests') {
        return this.alerts.emit(
          makeAlert({ type: ALERT_TYPE.DANGER, msg: err.message })
        );
      }

      if (err.statusCode === 422) {
        return this.alerts.emit(
          makeAlert({ type: ALERT_TYPE.WARNING, msg: err.message })
        );
      }

      throw err;
    }

    await this.router.navigate(['/profile']);
  }
}

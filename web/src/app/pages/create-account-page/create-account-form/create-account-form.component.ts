import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { Alert, ALERT_TYPE } from 'src/app/interfaces/alert';
import { makeAlert } from 'src/lib/make-alert';
import { ApiService } from '../../../modules/api/api.service';
import { AuthService } from '../../../modules/firebase/auth.service';

function _doubleCheckEnteredPassword(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const mismatchingPasswords =
      formGroup.value.password !== formGroup.value.reenterPassword;

    return mismatchingPasswords
      ? {
          password: formGroup.value.password,
          reenterPassword: formGroup.value.reenterPassword,
        }
      : null;
  };
}

@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.css'],
})
export class CreateAccountFormComponent implements OnInit {
  @Output() alerts = new EventEmitter<Alert>();

  createAccountForm: FormGroup;
  showSpinner = false;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {
    this.createAccountForm = new FormGroup(
      {
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [Validators.required]),
        reenterPassword: new FormControl('', [Validators.required]),
        firstName: new FormControl(''),
        lastName: new FormControl(''),
      },
      [_doubleCheckEnteredPassword()]
    );
  }

  ngOnInit(): void {}

  async onSubmit() {
    if (!this.createAccountForm.valid) {
      return;
    }

    this.showSpinner = true;

    try {
      await this.auth.signUpWithEmailAndPassword({
        email: this.createAccountForm.value.email,
        password: this.createAccountForm.value.password,
      });

      await this.api.post('/auth/create-account', {
        email: this.createAccountForm.value.email,
        firstName: this.createAccountForm.value.firstName,
        lastName: this.createAccountForm.value.lastName,
      });

      // Explicitly sign in the user
      await this.auth.signIn({
        email: this.createAccountForm.value.email,
        password: this.createAccountForm.value.password,
      });

      this.showSpinner = false;

      await this.router.navigate(['/profile']);
    } catch (err: any) {
      this.showSpinner = false;

      if (err.statusCode === 422) {
        return this.alerts.emit(
          makeAlert({
            type: ALERT_TYPE.WARNING,
            msg: err.message,
          })
        );
      }
      throw err;
    }
  }
}

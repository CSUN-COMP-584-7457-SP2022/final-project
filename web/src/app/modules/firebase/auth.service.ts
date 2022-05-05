import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { makeApiError } from 'src/lib/make-api-error';

import { FirebaseModule } from './firebase.module';

@Injectable({
  providedIn: FirebaseModule,
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(private auth: AngularFireAuth) {
    this.user$ = this.auth.authState.pipe();
  }

  async signIn(credentials: { email: string; password: string }) {
    try {
      await this.auth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      );
    } catch (err: any) {
      if (err.code === 'auth/wrong-password') {
        throw makeApiError(422, 'Invalid password.', err);
      }

      if (err.code === 'auth/too-many-requests') {
        throw makeApiError(
          422,
          'Too many requests. Account has been temporarily disabled.',
          err
        );
      }

      if (err.code === 'auth/user-not-found') {
        throw makeApiError(422, 'Invalid email.', err);
      }

      throw makeApiError(422, 'Failed to sign into account.', err);
    }
  }

  async signOut() {
    await this.auth.signOut();
  }

  async signUpWithEmailAndPassword(credentials: {
    email: string;
    password: string;
  }) {
    try {
      await this.auth.createUserWithEmailAndPassword(
        credentials.email,
        credentials.password
      );
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        throw makeApiError(422, 'Email address already in use.', err);
      }
      throw makeApiError(422, 'Failed to create an account.', err);
    }
  }

  async sendPasswordResetEmail(email: string) {
    try {
      const user = await this.auth.currentUser;

      if (email && user?.email !== email) {
        throw makeApiError(422, 'Email does not belong to user!');
      }

      await this.auth.sendPasswordResetEmail(email);
    } catch (err: any) {
      console.error(err);
      if (err.statusCode === 422) {
        throw err;
      }
      throw makeApiError(422, 'Failed to send password reset email.', err);
    }
  }

  get currentUser() {
    return this.auth.currentUser;
  }
}

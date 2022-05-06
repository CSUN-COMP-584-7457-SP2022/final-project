import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase';

import { AuthService } from '../../modules/firebase/auth.service';

const SIGN_IN_ROUTE = 'sign-in';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user$: Observable<firebase.User | null>;

  constructor(private auth: AuthService, private router: Router) {
    this.user$ = this.auth.user$.pipe();
  }

  ngOnInit(): void {}

  handleSignIn() {
    return this.router.navigate([SIGN_IN_ROUTE]);
  }

  async handleSignOut() {
    await this.auth.signOut();
    await this.router.navigate(['']);
  }

  atSignInPage() {
    return this.router.url.includes(SIGN_IN_ROUTE);
  }
}

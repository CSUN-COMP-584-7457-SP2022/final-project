import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { ApiService } from 'src/app/modules/api/api.service';
import { AuthService } from 'src/app/modules/firebase/auth.service';
import { Alert } from 'src/app/interfaces/alert';

type UserInfo = {
  email: string;
  firstName: string;
  lastName: string;
} | null;

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  userInfo$: BehaviorSubject<UserInfo>;
  userSub: Subscription | null;
  userPollSub: Subscription | null;

  PROFILE_TABS = [
    {
      id: 'editName',
      name: 'Edit Name',
      title: 'Edit your name',
    },
    {
      id: 'resetPassword',
      name: 'Reset Password',
      title: 'Send password reset email',
    },
    {
      id: 'useDiabeticCompass',
      name: 'Use Diabetic Compass',
      title: 'Use Diabetic Compass',

      // HACK to manually load this particular tab
      hidden: true,
      // End of HACK
    },
  ];

  activeTab: { id: string; name: string; title: string };
  alerts: { [id: string]: Alert } = {};

  constructor(private api: ApiService, private auth: AuthService) {
    this.userInfo$ = new BehaviorSubject<UserInfo>(null);

    this.userSub = null;
    this.userPollSub = null;

    this.activeTab = this.PROFILE_TABS[0];
  }

  ngOnInit(): void {
    this.userSub?.unsubscribe();

    this.userSub = this.auth.user$.subscribe((user) => {
      if (!user) {
        return;
      }

      this.api.get<any>(`/users/read`).then((res: any) => {
        const {
          data: {
            user: { email, firstName, lastName },
          },
        } = res;

        this.userInfo$.next({
          email,
          firstName,
          lastName,
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  isTabActive(tabId: string) {
    return this.activeTab.id === tabId;
  }

  setActiveTab(tabId: string) {
    const tab = this.PROFILE_TABS.find((tab) => tab.id === tabId);

    if (!tab) {
      return;
    }

    this.activeTab = tab;
  }

  showAlert(alert: Alert) {
    this.alerts = {
      ...this.alerts,
      [alert.id]: alert,
    };
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ApiModule } from './api.module';
import { AuthService } from '../firebase/auth.service';
import { environment } from '../../../environments/environment';

interface ApiGetOptions {
  headers?: { [header: string]: string };
}

interface ApiPostOptions {
  headers?: { [header: string]: string };
  body?: {};
}

@Injectable({
  providedIn: ApiModule,
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private firebaseAuthService: AuthService
  ) {}

  get<T>(path: string, options?: ApiGetOptions) {
    return new Promise(async (resolve, reject) => {
      const url = environment.api.url + path;

      const user = await this.firebaseAuthService.currentUser;

      options = {
        ...options,
        headers: {
          Authorization: `Bearer firebase/${user?.uid ?? ''}`,
        },
      };

      const sub = this.http.get<T>(url, options).subscribe({
        next: (response) => {
          resolve(response);
          sub.unsubscribe();
        },
        error: (err) => {
          reject(err);
          sub.unsubscribe();
        },
      });
    });
  }

  post<T>(path: string, body: any, options?: ApiPostOptions) {
    return new Promise(async (resolve, reject) => {
      const url = environment.api.url + path;

      const user = await this.firebaseAuthService.currentUser;

      options = {
        ...options,
        headers: {
          Authorization: `Bearer firebase/${user?.uid ?? ''}`,
        },
      };

      const sub = this.http.post<T>(url, body, options).subscribe({
        next: (response) => {
          resolve(response);
          sub.unsubscribe();
        },
        error: (err) => {
          reject(err);
          sub.unsubscribe();
        },
      });
    });
  }

  get$<T>(path: string, options?: ApiGetOptions) {
    return this.firebaseAuthService.user$.pipe(
      map((user) => {
        const url = environment.api.url + path;

        options = {
          ...options,
          headers: {
            Authorization: `Bearer firebase/${user?.uid ?? ''}`,
          },
        };

        return this.http.get<T>(url, options);
      })
    );
  }

  post$<T>(path: string, body: any, options?: ApiPostOptions) {
    return this.firebaseAuthService.user$.pipe(
      map((user) => {
        const url = environment.api.url + path;

        options = {
          ...options,
          headers: {
            Authorization: `Bearer firebase/${user?.uid ?? ''}`,
          },
        };

        return this.http.post<T>(url, body, options);
      })
    );
  }
}

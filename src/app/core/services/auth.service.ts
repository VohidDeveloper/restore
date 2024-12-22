import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment as env } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthBody, IResponse, User } from '../../shared/models';
import { StorageService } from './storage.service';
import { ACCESS_TOKEN_KEY } from 'shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly storage = inject(StorageService);

  authStatus = new BehaviorSubject(this.getAuthStatus());

  authenticateUser(
    body: AuthBody,
  ): Observable<IResponse<{ token: string; user: User }>> {
    return this.http.post<IResponse<{ token: string; user: User }>>(
      `${env.authApi}/${env.api.login}`,
      body,
    );
  }

  checkEmail(email: string): Observable<IResponse<{ validEmail: boolean }>> {
    return this.http.post<IResponse<{ validEmail: boolean }>>(
      `${env.authApi}/${env.api.check}`,
      { email },
    );
  }

  registerUser(
    body: AuthBody,
  ): Observable<IResponse<{ token: string; user: User }>> {
    return this.http.post<IResponse<{ token: string; user: User }>>(
      `${env.authApi}/${env.api.register}`,
      body,
    );
  }

  sendResetLink(email: string): Observable<IResponse<{ email: string }>> {
    return this.http.post<IResponse<{ email: string }>>(
      `${env.authApi}/${env.api.forgotPassword}`,
      { email },
    );
  }

  resetPassword(token: string, password: string): Observable<IResponse<void>> {
    return this.http.post<IResponse<void>>(
      `${env.authApi}/${env.api.resetPassword}`,
      { token, password },
    );
  }

  getAuthStatus(): boolean {
    return !!this.storage.get(ACCESS_TOKEN_KEY);
  }

  logout(): void {
    this.storage.clear();
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    this.authStatus.next(this.getAuthStatus());
  }
}

import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

import { AuthResponseData } from '../models/Auth.model';
import { User, UserData, UserLoginData } from '../models/User.model';
import { HTTPService } from './http.service';
import { consts } from '../utils/consts';

@Injectable({
  providedIn: 'root'
})

export class AuthService
{

  user: User;

  private tokenExpirationTimer: any;

  constructor(private http: HTTPService, private router: Router) { }

  async login(user: UserLoginData)
  {
    const url = consts.API.loginURL;
    const params = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    };

    const result = await this.http.post<AuthResponseData>(url, params);

    this.handleAuthentication(result);

    return result.status;
  }

  checkLogin()
  {
    const userData: UserData = JSON.parse(localStorage.getItem('userData'));

    if (!userData)
    {
      this.router.navigate(['/public/login']);
      return false;
    }

    this.user = new User(
      userData.email,
      userData.id,
      userData.token,
      new Date(userData.tokenExpirationDate)
    );

    if (this.user.token)
    {
      const expirationDuration =
        new Date(userData.tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }

    return true;
  }

  public async signup(user: UserLoginData)
  {
    const url = consts.API.signUpURL;
    const params = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    };

    const result = await this.http.post<AuthResponseData>(url, params);

    this.handleAuthentication(result);

    return result.status;

    // return this.http
    //   .post<AuthResponseData>(
    //     'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.firebase.apiKey,
    //     {
    //       email: user.email,
    //       password: user.password,
    //       returnSecureToken: true
    //     }
    //   )
    //   .pipe(
    //     catchError(this.handleError),
    //     tap(resData =>
    //     {
    //       this.handleAuthentication(
    //         resData.email,
    //         resData.localId,
    //         resData.idToken,
    //         +resData.expiresIn
    //       );
    //     })
    //   ).subscribe();
  }

  autoLogout(expirationDuration: number)
  {
    this.tokenExpirationTimer = setTimeout(() =>
    {
      this.logout();
    }, expirationDuration);
  }

  logout()
  {
    this.router.navigate(['/public/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer)
    {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private handleError(errorRes: HttpErrorResponse)
  {
    console.log(errorRes);
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error)
    {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message)
    {
      case 'EMAIL_EXISTS':
        errorMessage = 'E-mail cím már foglalt';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'E-mail cím';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Helytelen jelszó';
        break;
    }
    return throwError(errorMessage);

    //return this.handler.errorHandler(errorRes.error.error.message)
  }

  private handleAuthentication(authData: AuthResponseData)
  {
    const expirationDate = new Date(new Date().getTime() + authData.expiresIn * 1000);
    const user = new User(authData.email, authData.localId, authData.idToken, expirationDate);
    this.autoLogout(authData.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}

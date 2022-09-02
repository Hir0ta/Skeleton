/* eslint-disable curly */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthData, AuthResponseData } from '../models/Auth.model';
import { User, UserData, UserLoginData } from '../models/User.model';
import { HTTPService } from './http.service';
import { consts } from '../utils/consts';

@Injectable({
  providedIn: 'root'
})

export class AuthService
{

  public user: User;

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

    if (result.status)
    {
      await this.refreshTokens(result.data);
    }


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
      userData.idToken,
      new Date(userData.tokenExpirationDate),
      userData.refreshToken,
      userData.accessToken
    );

    if (this.user.idToken)
    {
      const expirationDuration =
        new Date(userData.tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }

    return this.user;
  }

  public async signup(user: UserLoginData)
  {
    const url = consts.API.signUpURL;
    const params = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    };

    const result = (await this.http.post<AuthResponseData>(url, params)).data;

    this.handleAuthentication(result);

    return result.status;
  }

  async autoLogout(expirationDuration: number)
  {

    this.tokenExpirationTimer = setTimeout(async () =>
    {
      //if can't get access token, logout
      if (!this.refreshTokens({})) this.logout();
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

  private async handleAuthentication(authData: AuthData)
  {
    const expirationDate = new Date(new Date().getTime() + authData.expiresIn * 1000);
    this.user = new User(authData.email, authData.localId, authData.idToken, expirationDate, authData.refreshToken, authData.access_token);
    this.autoLogout(authData.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(this.user));

  }

  private async refreshTokens(result)
  {
    let url = consts.API.refreshTokensURL;

    let params =
    {
      grant_type: 'refresh_token',
      refresh_token: result.refreshToken
    };

    //call tokens with refresh token
    let tokens = await this.http.post<AuthData>(url, params);

    result = { ...result, ...tokens };

    //if get tokens, store it and restart auto logout counter
    if (result)
    {
      this.handleAuthentication(result);
      return true;
    }
    else
    {
      return false;
    }
  }
}

/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable curly */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserLoginData } from 'src/app/models/User.model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'sign-up-page',
  templateUrl: './sign-up-page.page.html',
  styleUrls: ['./sign-up-page.page.scss'],
})
export class SignUpPage implements OnInit
{
  language = this.services.languageService.selectedLanguage;
  userData = new FormGroup(
    {
      email: new FormControl('',
        [
          Validators.required
        ]),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6)
        ])
    }
  );

  onAction = false;
  invalidEmail = false;
  invalidPwd = false;

  constructor(public services: CommonService, private router: Router) { }

  ngOnInit()
  {
  }

  async signup()
  {
    if (this.onAction) return;
    this.onAction = true;
    if (this.userData.controls.email.status === 'INVALID') this.invalidEmail = true;
    if (this.userData.controls.password.status === 'INVALID') this.invalidPwd = true;
    if (!this.userData.valid) return;

    const user: UserLoginData = {
      email: this.userData.value.email,
      password: this.userData.value.password
    };

    const result = await this.services.auth.signup(user);
    if (result) this.router.navigateByUrl('/public/login');
    this.onAction = false;
  }
}

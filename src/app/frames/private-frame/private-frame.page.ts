/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-private-frame',
  templateUrl: './private-frame.page.html',
  styleUrls: ['./private-frame.page.scss'],
})
export class PrivateFrame implements OnInit
{
  language = this.services.languageService.selectedLanguage;

  public appPages = [
    { title: 'Kezdőlap', url: 'welcome', icon: 'apps' },
  ];

  constructor(public services: CommonService) { }

  ngOnInit()
  {
    this.services.auth.checkLogin();
  }

}

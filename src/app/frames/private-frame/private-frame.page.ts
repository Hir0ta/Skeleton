/* eslint-disable curly */
/* eslint-disable prefer-const */
/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, OnInit } from '@angular/core';
import { appPages } from 'src/app/pages/page-list';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-private-frame',
  templateUrl: './private-frame.page.html',
  styleUrls: ['./private-frame.page.scss'],
})
export class PrivateFrame implements OnInit
{
  language = this.services.languageService.selectedLanguage;

  public pages = appPages;

  constructor(public services: CommonService) { }

  async ngOnInit()
  {
    this.services.auth.checkLogin();
  }

}

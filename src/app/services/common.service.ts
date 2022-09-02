import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { AuthService } from './auth.service';
import { HTTPService } from './http.service';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService
{
  user: User;

  constructor(
    public http: HTTPService,
    public auth: AuthService,
    public languageService: LanguageService,
  )
  {
    this.languageService.selectLanguage('HU');
  }
}

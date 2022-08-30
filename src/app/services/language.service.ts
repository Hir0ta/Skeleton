import { Injectable } from '@angular/core';
import { languageEN } from '../utils/EN';
import { languageHU } from '../utils/HU';


@Injectable({
  providedIn: 'root'
})
export class LanguageService
{

  selectedLanguage;
  constructor()
  {
    const language = localStorage.getItem('language') as 'HU' | 'EN';
    this.selectLanguage(language);
  }

  selectLanguage(language: 'HU' | 'EN' = 'HU')
  {
    switch (language)
    {
      case 'HU':
        this.selectedLanguage = languageHU;
        break;
      case 'EN':
        this.selectedLanguage = languageEN;
    }

    localStorage.setItem('language', language);
  }
}

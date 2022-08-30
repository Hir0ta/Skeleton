/* eslint-disable curly */
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { throwError } from 'rxjs';
import { LanguageService } from '../services/language.service';

export class Handlers
{
  constructor() { }

  public async errorHandler(errorRes: HttpErrorResponse)
  {
    const alertCtrl = new AlertController();

    const language = new LanguageService().selectedLanguage;

    let errorMessage = language.errorCodes.UNKNOWN_ERROR;

    if (errorRes.error.error) errorMessage = language.errorCodes[errorRes.error.error.message];


    const alert = await alertCtrl.create({
      header: errorMessage,
      buttons: [
        {
          text: 'OK',
          role: 'confirm'
        },
      ],
    });

    await alert.present();

    return throwError(errorMessage);
  }
}

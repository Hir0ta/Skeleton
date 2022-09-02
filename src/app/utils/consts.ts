/* eslint-disable @typescript-eslint/naming-convention */
import { environment } from 'src/environments/environment';


export const consts =
{
  API:
  {
    signUpURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.firebase.apiKey,
    loginURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.firebase.apiKey,
    refreshTokensURL: 'https://securetoken.googleapis.com/v1/token?key=' + environment.firebase.apiKey
  }
};

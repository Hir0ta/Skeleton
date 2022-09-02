export interface UserData
{
  email: string;
  id: string;
  idToken: string;
  tokenExpirationDate: Date;
  refreshToken: string;
  accessToken?: string;
}

export interface UserLoginData
{
  email: string;
  password: string;
}


export class User implements UserData
{
  constructor(
    public email: string,
    public id: string,
    public idToken: string,
    public tokenExpirationDate: Date,
    public refreshToken: string,
    public accesToken?: string
  ) { }

  get _token()
  {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate)
    {
      return null;
    }
    return this.idToken;
  }
}

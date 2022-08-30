export interface UserData
{
  email: string;
  id: string;
  token: string;
  tokenExpirationDate: Date;
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
    public token: string,
    public tokenExpirationDate: Date
  ) { }

  get _token()
  {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate)
    {
      return null;
    }
    return this.token;
  }
}

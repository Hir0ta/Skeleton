/* eslint-disable @typescript-eslint/naming-convention */
export interface AuthData
{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: number;
  localId: string;
  registered?: boolean;
  access_token?: string;
};

export interface AuthResponseData
{
  status: boolean;
  data: AuthData;
}

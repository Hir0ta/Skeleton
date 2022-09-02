/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Handlers } from '../utils/handler';

interface HTTPResponse
{
  status: boolean;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class HTTPService
{
  constructor(private http: HttpClient, private handlers: Handlers)
  {
  }

  async post<ResData>(url: string, params: object): Promise<HTTPResponse>
  {
    let result: HTTPResponse = {
      status: false
    };

    await this.http
      .post<ResData>(
        url,
        params
      )
      .pipe(
        tap((resData) =>
        {
          result.status = true;
          result.data = resData;
        }),
        catchError(this.handlers.errorHandler)
      ).toPromise();

    return result;
  }

  async get<ResData>(url: string): Promise<HTTPResponse>
  {
    let result: HTTPResponse = {
      status: false
    };

    await this.http.get<ResData>(url).
      pipe(
        tap((resData) =>
        {
          result.status = true;
          result.data = resData;
        }),
        catchError(this.handlers.errorHandler)
      ).toPromise();

    return result;
  }
}

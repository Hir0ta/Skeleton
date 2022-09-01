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
  constructor(private http: HttpClient)
  {
  }

  async post<ResData>(url, params): Promise<HTTPResponse>
  {
    const handlers = new Handlers();

    let result: HTTPResponse = {
      status: false
    };

    await this.http
      .post<ResData>(
        url,
        params
      )
      .pipe(
        tap((resData: ResData) =>
        {
          result.status = true;
          result.data = resData;
        }),
        catchError(handlers.errorHandler)
      ).toPromise();

    return result;
  }

  async get<ResData>(url): Promise<HTTPResponse>
  {
    const handlers = new Handlers();

    let result: HTTPResponse = {
      status: false
    };

    await this.http.get<ResData>(url).
      pipe(
        tap((resData: ResData) =>
        {
          result.status = true;
          result.data = resData;
        }),
        catchError(handlers.errorHandler)
      ).toPromise();

    return result;
  }
}

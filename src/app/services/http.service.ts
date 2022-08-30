import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Handlers } from '../utils/handler';


@Injectable({
  providedIn: 'root'
})
export class HTTPService
{

  private result = { status: false };

  constructor(private http: HttpClient)
  {
  }

  async post<ResData>(url, params): Promise<ResData>
  {
    const handlers = new Handlers();

    await this.http
      .post<ResData>(
        url,
        params
      )
      .pipe(
        catchError(handlers.errorHandler),
        tap(async (resData) =>
        {
          this.result.status = true;
          this.result = { ...this.result, ...resData };
        })
      ).toPromise();

    return this.result as any as ResData;
  }
}

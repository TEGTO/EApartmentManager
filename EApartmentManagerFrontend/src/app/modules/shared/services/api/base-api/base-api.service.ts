import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { CustomErrorHandler, URLDefiner } from '../../../index';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  constructor(private httpClient: HttpClient, private errorHandler: CustomErrorHandler, private urlDefiner: URLDefiner) { }

  protected getHttpClient() {
    return this.httpClient;
  }
  protected getErrorHandler() {
    return this.errorHandler;
  }
  protected combinePathWithApartmentApiUrl(path: string) {
    return this.urlDefiner.combineWithApartmentApiUrl(path);
  }
  protected handleError(error: any) {
    let message = this.errorHandler.handleError(error);
    return throwError(() => new Error(message));
  }
}
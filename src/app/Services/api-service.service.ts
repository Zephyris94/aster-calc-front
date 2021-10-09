import { AppSettingsService } from './config-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService {
  constructor(private httpClient: HttpClient, private appSettings: AppSettingsService) { }

  protected getQuery<TRequest, TResult>(url: string, request: TRequest): Observable<TResult> {
    const params: any = { ...request };

    return this.httpClient
      .get<TResult>(`${this.appSettings.baseUrl}/${url}`, { params });
  }

  protected postQuery<TResult>(url: string, body?: any): Observable<TResult> {
    return this.httpClient
      .post<TResult>(`${this.appSettings.baseUrl}/${url}`, body);
  }
}

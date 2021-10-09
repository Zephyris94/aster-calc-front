import { Observable } from 'rxjs';
import { AppSettingsService } from './config-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api-service.service';
import { CalculationResultModel, PathRequestModel } from '../Core/models';

@Injectable({
  providedIn: 'root'
})
export class CalcApiService extends ApiService {

  constructor(httpClient: HttpClient, appSettingsService: AppSettingsService) {
    super(httpClient, appSettingsService);
  }

  getSources(): Observable<Array<string>> {
    return super.getQuery<any, string[]>(`calcapi/Sources`, {});
  }

  getDestinations(): Observable<Array<string>> {
    return super.getQuery<any, string[]>(`calcapi/Destinations`, {});
  }

  calculate(request: PathRequestModel): Observable<CalculationResultModel> {
    return super.postQuery<CalculationResultModel>(`calcapi/Calculate`, request);
  }
}

import { Observable } from 'rxjs';
import { AppSettingsService } from './config-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api-service.service';
import { CalculationResultModel, NodeModel, PathRequestModel } from '../Core/models';

@Injectable({
  providedIn: 'root'
})
export class CalcApiService extends ApiService {

  constructor(httpClient: HttpClient, appSettingsService: AppSettingsService) {
    super(httpClient, appSettingsService);
  }

  getSources(): Observable<Array<NodeModel>> {
    return super.getQuery<any, NodeModel[]>(`node/sources`, {});
  }

  getDestinations(): Observable<Array<NodeModel>> {
    return super.getQuery<any, NodeModel[]>(`node/sources`, {});
  }

  calculate(request: PathRequestModel): Observable<CalculationResultModel> {
    return super.postQuery<CalculationResultModel>(`PathFinding/Calculate`, request);
  }
}

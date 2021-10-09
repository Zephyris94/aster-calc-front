import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CalculationResultModel, PathRequestModel } from '../Core/models';
import { CalcApiService } from './calc-api-service.service';

@Injectable({
  providedIn: 'root'
})
export class CalcStoreService {

  private sourcesSubject: BehaviorSubject<string[]> = new BehaviorSubject(Array());
  private destSubject: BehaviorSubject<string[]> = new BehaviorSubject(Array());

  private filteredSourcesSubject: BehaviorSubject<string[]> = new BehaviorSubject(Array());
  private filteredDestSubject: BehaviorSubject<string[]> = new BehaviorSubject(Array());

  private calcResult: BehaviorSubject<CalculationResultModel | undefined> = new BehaviorSubject<CalculationResultModel | undefined>(undefined)

  public sources$: Observable<string[]> = this.filteredSourcesSubject.asObservable();
  public destinations$: Observable<string[]> = this.filteredDestSubject.asObservable();
  public calcResult$: Observable<CalculationResultModel | undefined> = this.calcResult.asObservable();

  constructor(private calcApiService: CalcApiService) { }

  clearItems(): void {
    this.sourcesSubject.next([]);
    this.destSubject.next([]);
  }

  filterSources(value: string) {
    this.filteredSourcesSubject.next(this.sourcesSubject.value.filter(src => src.toLowerCase().startsWith(value.toLowerCase())));
  }

  filterDestinations(value: string) {
    this.filteredDestSubject.next(this.destSubject.value.filter(dest => dest.toLowerCase().startsWith(value.toLowerCase())));
  }

  refillSources() {
    this.filteredSourcesSubject.next(this.sourcesSubject.value);
  }

  refillDestinations() {
    this.filteredDestSubject.next(this.destSubject.value);
  }

  initSources(): void {
    this.calcApiService.getSources()
      .subscribe(result => {
        this.sourcesSubject.next(result);
        this.filteredSourcesSubject.next(result);
      });
  }

  initDestinations() {
    this.calcApiService.getDestinations()
      .subscribe(result => {
        this.destSubject.next(result);
        this.filteredDestSubject.next(result);
      });
  }

  getCalcResult(payload: PathRequestModel): Subscription {
    return this.calcApiService.calculate(payload)
      .subscribe(response => {
        this.calcResult.next(response);
      });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface AppSettings {
  baseUrl: string
}

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  private appSettings: AppSettings | undefined = {
    baseUrl: 'http://localhost:4200',
  };

  constructor(private httpClient: HttpClient) { }

  async loadAppSettings(): Promise<void> {
    this.appSettings = await this.httpClient
      .get<AppSettings>('assets/config.json')
      .toPromise();
  }

  get baseUrl(): string {
    return this.appSettings ? this.appSettings.baseUrl : "";
  }
}
